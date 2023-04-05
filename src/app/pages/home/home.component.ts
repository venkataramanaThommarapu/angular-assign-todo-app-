import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModeldeleteComponent } from '../modeldelete/modeldelete.component';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/providers/common.service';
import * as XLSX from 'xlsx';
// import {Component,ViewChild, ElementRef} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



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
  // @ViewChild('TABLE') table: ElementRef;

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


  // ExportTOExcel()
  // {
  //   console.log("export");
  //   this.table.nativeElement.style.background = "red";
  //   const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   XLSX.writeFile(wb,'SheetJS.xlsx');
  //   console.log("exported");

  // }
  ExportTOExcel() {
    const workSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'filename.xlsx');
}



downloadAsPDF() {
  const element: HTMLElement = document.getElementById('mycard') as HTMLElement;
  const options = {
    background: 'white',
    scale: 3
  };

  html2canvas(element, options).then((canvas) => {
    var img = canvas.toDataURL("image/PNG");
    var doc = new jsPDF('l', 'mm', 'a4', true);
    const bufferX = 5;
    const bufferY = 5;
    const imgProps = (<any>doc).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
    return doc;
  }).then((doc) => {
    doc.save('postres.pdf');
  });
}

}



