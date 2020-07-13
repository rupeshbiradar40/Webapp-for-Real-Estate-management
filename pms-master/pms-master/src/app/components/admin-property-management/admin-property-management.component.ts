import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-property-management',
  templateUrl: './admin-property-management.component.html',
  styleUrls: ['./admin-property-management.component.css'],
})
export class AdminPropertyManagementComponent implements OnInit {
  properties: any[];
  zipCode: string;
  alertClass: string;
  alertMessage: string;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.doListPorperties().subscribe((res) => {
      if (res.status == 200) {
        this.properties = res.data;
      } else {
        this.properties = [];
      }
    });
  }

  onSubmit() {
    console.log(this.zipCode);
    this.auth.doSearchProperties(this.zipCode).subscribe((res) => {
      if (res.status == 200) {
        this.properties = res.data;
      } else {
        this.properties = [];
      }
    });
  }

  doDeleteProperty(propertyId: string) {
    this.auth.doDeleteHardProperty(propertyId).subscribe((res) => {
      if (res.status == 200) {
        let index = this.properties.indexOf(res.data);
        this.properties.splice(index, 1);
        this.alertMessage = res.statusText;
        this.alertClass = 'alert-success';
      } else {
        this.alertMessage = res.statusText;
        this.alertClass = 'alert-danger';
      }
    });
  }

  doUpdatePropertyDetails(propertyId: string) {
    this.auth.doRedirect(['/admin-update-property/', propertyId]);
  }
}
