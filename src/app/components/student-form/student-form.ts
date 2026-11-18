import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrl: './student-form.css',
  templateUrl: './student-form.html',
})
export class StudentForm {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private studentService = inject(StudentService);
  studentForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    age: [null as number | null, [Validators.required, Validators.min(1)]],
    gender: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
  });

  submitForm(): void {
  if (this.studentForm.invalid) {
    this.studentForm.markAllAsTouched();
    return;
  }

  const studentData = this.studentForm.value as Omit<Student, 'id'>;

  // EDIT MODE
  if (this.isEditMode && this.studentId !== null) {
    this.studentService.updateStudent(this.studentId, studentData).subscribe({
      next: () => {
        alert('Student updated successfully!');
        this.router.navigate(['/students']);
      },
      error: (err) => {
        console.error('Error updating student:', err);
        alert('Failed to update student.');
      }
    });

    return;
  }

  // ADD MODE
  this.studentService.addStudent(studentData).subscribe({
    next: () => {
      alert('Student added successfully!');
      this.router.navigate(['/students']);
    },
    error: (err) => {
      console.error('Error adding student:', err);
      alert('Failed to add student.');
    }
  });
}

  cancel(): void {
    this.router.navigate(['/students']);
  }

  isEditMode = false;
  studentId: number | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.studentId = Number(id);
      this.loadStudent(this.studentId);
    }
  }
  loadStudent(id: number): void {
  this.studentService.getStudentById(id).subscribe({
    next: (student) => {
      this.studentForm.patchValue(student);
    },
    error: (err) => {
      console.error('Error loading student:', err);
      alert('Failed to load student details.');
    }
  });
}
}
