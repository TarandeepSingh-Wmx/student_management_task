import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  students: Student[] = [];
  loading = true;
  error = '';
  searchText = '';

  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    console.log('Loading students...');

    this.studentService.getStudents().subscribe({
      next: (data) => {
        console.log('Students received:', data);

        this.students = data;
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('API error:', err);

        this.error = 'Failed to load students.';
        this.loading = false;

        this.cdr.detectChanges();
      },
    });
  }

  deleteStudent(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this student?');

    if (!confirmDelete) {
      return;
    }

    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.students = this.students.filter((student) => student.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error deleting student:', err);
        alert('Failed to delete student.');
      },
    });
  }

  get filteredStudents(): Student[] {
    const search = this.searchText.toLowerCase().trim();

    if (!search) {
      return this.students;
    }

    return this.students.filter(
      (student) =>
        student.firstName.toLowerCase().includes(search) ||
        student.lastName.toLowerCase().includes(search) ||
        student.email.toLowerCase().includes(search) ||
        student.phone.toLowerCase().includes(search) ||
        student.id.toString().includes(search),
    );
  }
}
