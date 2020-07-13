import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css'],
})
export class MyPropertiesComponent implements OnInit {
  properties: any[];
  alertClass: string;
  alertMessage: string;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.properties = [];
    this.auth.doListMyProperties().subscribe((res) => {
      if (res.status == 200) {
        this.properties = res.data;
      }
    });
  }

  doDeleteProperty(propertyId: string) {
    this.auth.doDeleteSoftProperty(propertyId).subscribe((res) => {
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
}
