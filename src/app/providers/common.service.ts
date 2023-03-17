import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIS } from '../apis';



@Injectable({
  providedIn: 'root'
})
export class CommonService {

  todosCount:number = 0;

  constructor(private http: HttpClient) { }


  getTodos():Observable<any>{
    return this.http.get(APIS.GET_TODOS).pipe();
  }

  createTodos(reqBody:any):Observable<any>{
    return this.http.post(APIS.CREATE_TODOS, reqBody).pipe();
  }

  updateTodos(id: string, reqBody:any):Observable<any>{
    return this.http.put(APIS.UPDATE_TODOS(id), reqBody).pipe();
  }

  deleteTodos(id:string):Observable<any>{
    return this.http.delete(APIS.DELETE_TODOS(id)).pipe();
  }


}
