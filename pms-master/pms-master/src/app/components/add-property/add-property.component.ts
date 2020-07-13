import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  propertyRegForm: FormGroup;
  alertClass: string;
  alertMessage: string;
  filesToUpload = null;
  fileUploadMsg: string;
  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.propertyRegForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      area: [''],
      type: [''],
      owner: [''],
      isAvailableForBuy: [false],
      buyPrice: [''],
      isAvailableForRent: [false],
      rentPrice: [''],
      photos: [''],
    });
  }

  onSubmit() {
    if (this.filesToUpload && this.filesToUpload.length > 0) {
      alert("You haven't uploaded property images yet");
      return false;
    }
    console.log(this.propertyRegForm.value);
    this.auth.doAddProperty(this.propertyRegForm.value).subscribe((res) => {
      if (res.status == 201) {
        this.alertMessage = res.statusText;
        this.alertClass = 'alert-success';
        this.propertyRegForm.reset();
      } else {
        console.log(res);
        this.alertMessage = res.statusText;
        this.alertClass = 'alert-danger';
      }
    });
  }

  files(files) {
    this.filesToUpload = files;
  }

  upload() {
    const formData = new FormData();
    const files = this.filesToUpload;
    for (let i = 0; i < files.length; i++) {
      formData.append(`fil${i}`, files.item(i), files.item(i).name);
    }
    this.auth.doUploadPropertyImages(formData).subscribe((res) => {
      console.log(res);
      if (res.status == 202) {
        this.filesToUpload = null;
        this.fileUploadMsg = res.statusText;
        this.propertyRegForm.controls['photos'].setValue(res.data);
      }
    });
  }
}
