import { Component, ElementRef, ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  // matcher = new MyErrorStateMatcher();

  name: string = 'T venkataramana';
  email: string = 'ram@motivitylabs.com';
  phone: string = '+91 8074747172';
  address: string = 'Knowldge city,TS';
  title:string='MOTIVITYLABS';
  tagline:string='Innovation as a service';
  role:string='UI Developer';
  

  selectedImage: string = "";
  previewImage: string = "";
  allFieldsFilled = false;
 


  // @ViewChild('mycard') content!:ElementRef

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
    }
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