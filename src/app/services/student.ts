import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  getStudentById(id: number): Observable<Student> {
    const existingStudent = this.students.find((student) => student.id === id);

    if (existingStudent) {
      return of(existingStudent);
    }

    return this.http.get<any>(`https://dummyjson.com/users/${id}`).pipe(
      map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        age: user.age,
        gender: user.gender,
        address: user.address.address,
        city: user.address.city,
        state: user.address.state,
      })),
    );
  }

  getStudents(): Observable<Student[]> {
    if (this.students.length > 0) {
      return of(this.students);
    }
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        this.students = response.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          age: user.age,
          gender: user.gender,
          address: user.address.address,
          city: user.address.city,
          state: user.address.state,
        }));

        return this.students;
      }),
    );
  }
  // post method
  addStudent(student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<any>('https://dummyjson.com/users/add', student).pipe(
      map((response) => {
        const newStudent: Student = {
          ...student,
          id: response.id,
        };

        this.students.push(newStudent);

        return newStudent;
      }),
    );
  }

  private students: Student[] = [];

  updateStudent(id: number, student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.put<any>(`https://dummyjson.com/users/${id}`, student).pipe(
      map((response) => {
        const updatedStudent: Student = {
          ...student,
          id: id,
        };

        const index = this.students.findIndex((s) => s.id === id);

        if (index !== -1) {
          this.students[index] = updatedStudent;
        }

        return updatedStudent;
      }),
    );
  }

  // delete student
  deleteStudent(id: number): Observable<any> {
  return this.http.delete(`https://dummyjson.com/users/${id}`).pipe(
    map(response => {
      this.students = this.students.filter(student => student.id !== id);
      return response;
    })
  );
}
}
