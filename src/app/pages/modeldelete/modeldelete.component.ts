import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/providers/common.service';

@Component({
  selector: 'app-modeldelete',
  templateUrl: './modeldelete.component.html',
  styleUrls: ['./modeldelete.component.scss']
})
export class ModeldeleteComponent implements OnInit {

  id: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private cs: CommonService, public dialog:MatDialogRef<ModeldeleteComponent>) {

  }

  ngOnInit() {
    console.log(this.data)
    this.id = this.data.id;
  }

  onDelete() {
    this.cs.deleteTodos(this.id).subscribe(res => {
      console.log(res);
      this.dialog.close({reload:true})
    })
  }

  closeModal(){
    this.dialog.close({reload:false})
  }
}
