
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/providers/common.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  editMode: boolean = false;

  hideRequiredControl = new FormControl(false);

  todoForm = this.fb.group({
    title: ["", Validators.compose([Validators.required, Validators.minLength(3)])],
    target: ["", Validators.compose([Validators.required])],
    completed: [false, Validators.compose([Validators.required])],

  })

  URLdata: any;
  constructor(private fb: FormBuilder, private cs: CommonService, private router: Router, private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((params: any) => {
      console.log("params", params)
      if (params.todo) {
        const paramstodo = JSON.parse(params.todo);
        console.log("paramstodo", paramstodo)
        this.URLdata = paramstodo;
        this.editMode = true;
        this.todoForm.get('title')?.setValue(paramstodo.title);
        this.todoForm.get('target')?.setValue(paramstodo.target);
        this.todoForm.get('completed')?.setValue(paramstodo.completed);
      } else {
        this.todoForm.reset();
        this.editMode = false;
      }

      console.log("this.todoForm", this.todoForm)
    })
  }

  onSubmit(event: any) {

    const now = new Date(); // get the current date and time
    if (this.todoForm.invalid) {
      return; // exit the function if any required fields are empty
    }
    const data = {
      title: this.todoForm.value.title,
      status: 1,
      target: this.todoForm.value.target, // set the "target" field to the form date value
      createdAt: now.toISOString(), // set the "createdat" field to the current date and time in ISO format
      updatedAt: now.toISOString(), // set the "updatedat" field to the current date and time in ISO format
      completed: this.todoForm.value.completed, // set the "completed" field to false initially
    };

    if (this.editMode) {
      this.cs.updateTodos(this.URLdata.id, data).subscribe(res => {
        console.log(res)
        this.router.navigate(['/'])
      })
    } else {
      this.cs.createTodos(data).subscribe(res => {
        console.log(res)
        this.router.navigate(['/'])
      })
    }

  }



}




