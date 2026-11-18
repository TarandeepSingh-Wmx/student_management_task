import { Routes } from '@angular/router';

import { StudentList } from './components/student-list/student-list';
import { StudentForm } from './components/student-form/student-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  },
  {
    path: 'students',
    component: StudentList
  },
  {
    path: 'students/add',
    component: StudentForm
  },
  {
    path: 'students/:id/edit',
    component: StudentForm
  },
  {
    path: 'students/:id/view',
    component: StudentForm
  },
  {
    path: '**',
    redirectTo: 'students'
  }
];
