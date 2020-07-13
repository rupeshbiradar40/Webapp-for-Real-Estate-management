import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-fav-properties',
  templateUrl: './my-fav-properties.component.html',
  styleUrls: ['./my-fav-properties.component.css'],
})
export class MyFavPropertiesComponent implements OnInit {
  properties: [];
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.properties = [];
    this.auth.doListMyFavProperties().subscribe((res) => {
      if (res.status == 200) {
        this.properties = res.data;
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
        this.auth.doListMyFavProperties().subscribe((res) => {
          if (res.status == 200) {
            this.properties = res.data;
          }
        });
      }
    });
  }
}
