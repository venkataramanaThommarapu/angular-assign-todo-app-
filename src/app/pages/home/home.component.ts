import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModeldeleteComponent } from '../modeldelete/modeldelete.component';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/providers/common.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'title', 'completed', 'target', 'createdAt', 'updatedAt', 'actions'];

  dataSource!: MatTableDataSource<any>;
  exampleTodos: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cs: CommonService, private dialog: MatDialog, private router: Router) { }


  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getTodos();
  }

  getTodos() {
    this.cs.getTodos().subscribe((res: any) => {
      console.log(res)
      if (res.length) {
        this.cs.todosCount = res.length
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialog(id: string): void {
    const dialogRef = this.dialog.open(ModeldeleteComponent, {
      width: '700px',
      height: '200px',
      data: {
        id: id
      } // You can pass data to your dialog component using this property
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.reload) {
        this.getTodos();
      }
    });
  }

  editTodoItem(row: any) {
    const params = JSON.stringify(row);
    this.router.navigate(['/todo'], { queryParams: { todo : params } })
  }
}



