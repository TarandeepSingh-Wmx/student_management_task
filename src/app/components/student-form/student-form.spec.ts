import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { StudentForm } from './student-form';

describe('StudentForm', () => {
  let component: StudentForm;
  let fixture: ComponentFixture<StudentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentForm],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
