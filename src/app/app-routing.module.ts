import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';

import { HomeComponent } from './pages/home/home.component';
import { TodoComponent } from './pages/todo/todo.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: "/" },
  { path: '', component: HomeComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'form', component: FormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
