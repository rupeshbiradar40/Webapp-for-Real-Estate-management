import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Iproperty } from 'src/app/models/iproperty';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-update-property',
  templateUrl: './admin-update-property.component.html',
  styleUrls: ['./admin-update-property.component.css'],
})
export class AdminUpdatePropertyComponent implements OnInit {
  propertyId: string;
  property: Iproperty;
  propertyRegForm: FormGroup;
  alertClass: string;
  alertMessage: string;
  isPropertyDetailsLoaded: boolean;
  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isPropertyDetailsLoaded = false;
    this.propertyId = this.activatedRoute.snapshot.paramMap.get('id');
    this.auth.doGetPropertyDetails(this.propertyId).subscribe((res) => {
      if (res.status == 200) {
        this.isPropertyDetailsLoaded = true;
        this.property = res.data;
        this.propertyRegForm = this.fb.group({
          id: [this.property._id],
          name: [this.property.name, Validators.required],
          description: [this.property.description],
          area: [this.property.area],
          type: [this.property.type],
          owner: [this.property.owner],
          isAvailableForBuy: ['' + this.property.isAvailableForBuy],
          buyPrice: [this.property.buyPrice],
          isAvailableForRent: ['' + this.property.isAvailableForRent],
          rentPrice: [this.property.rentPrice],
          photos: [this.property.photos],
        });

        console.log('In On Init' + res.data);
      } else {
        console.log('In On Init else' + res);
      }
    });
  }

  onSubmit() {
    console.log(this.propertyRegForm.value);
    this.auth.doUpdateProperty(this.propertyRegForm.value).subscribe((res) => {
      if (res.status == 200) {
        this.auth.doRedirect(['/admin-property-management']);
      } else {
        console.log('After Subbmiting update form');
        console.log(res);
        this.alertMessage = res.statusText;
        this.alertClass = 'alert-danger';
      }
    });
  }
}
