import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  properties: any;
  zipCode: string;
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

  isFavProperty(propertyId: string) {
    let index = this.auth.appUser.favProperties.indexOf(propertyId);
    if (index > -1) {
      return true;
    }
    return false;
  }

  toggleFavProperty(propertyId) {
    this.auth.doToggleFavProperty(propertyId).subscribe((res) => {
      if (res.status == 200) {
        this.auth.appUser = res.data;
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
}
