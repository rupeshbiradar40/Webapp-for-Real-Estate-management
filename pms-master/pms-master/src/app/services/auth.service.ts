import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Iuser } from '../models/iuser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const baseURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  appUser: Iuser;

  constructor(private http: HttpClient, private router: Router) {
    this.appUser = null;
  }

  doLogin(loginData) {
    let body = loginData;
    console.log('inside doLogin', body);
    return this.http.post(baseURL + '/login', body, httpOptions).pipe(
      map((res: any) => {
        console.log('Res', res.status);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  doRedirect(path: string[]) {
    try {
      this.router.navigate(path);
    } catch (err) {
      console.error(err);
      this.router.navigate(['/']);
    }
  }

  doRegister(loginData) {
    let body = loginData;
    console.log('inside doRegister', body);
    return this.http.post(baseURL + '/register', body, httpOptions).pipe(
      map((res: any) => {
        console.log('Res', res.status);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  doListPorperties() {
    console.log('inside doListPorperties');
    return this.http.get(baseURL + '/list-properties', httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  doAddProperty(propertyData) {
    propertyData.owner = this.appUser._id;

    let body = propertyData;
    console.log('inside doAddProperty', body);
    return this.http.post(baseURL + '/add-property', body, httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  doUpdateProperty(propertyData) {
    propertyData.owner = this.appUser._id;

    let body = propertyData;
    console.log('inside doUpdateProperty', body);
    return this.http
      .post(baseURL + '/admin-update-property', body, httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  doToggleFavProperty(propertyId: string) {
    let body = {
      user: this.appUser,
      propertyId: propertyId,
    };
    return this.http
      .post(baseURL + '/toggle-fav-property', body, httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }
  doSearchProperties(zipCode: string) {
    let body = {
      area: zipCode,
    };
    return this.http
      .post(baseURL + '/search-properties', body, httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  doListMyProperties() {
    let body = {
      userId: this.appUser._id,
    };
    return this.http.post(baseURL + '/my-properties', body, httpOptions).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  doListMyFavProperties() {
    let body = {
      favProperties: this.appUser.favProperties,
    };
    return this.http
      .post(baseURL + '/my-fav-properties', body, httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  doDeleteSoftProperty(propertyId: string) {
    let body = {
      propertyId,
    };
    return this.http
      .post(baseURL + '/delete-soft-property', body, httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }
  doDeleteHardProperty(propertyId: string) {
    let body = {
      propertyId,
    };
    return this.http
      .post(baseURL + '/delete-hard-property', body, httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }
  doUploadPropertyImages(body: FormData) {
    return this.http.post(baseURL + '/upload-property-images', body).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }
  doGetPropertyDetails(propertyId: string) {
    return this.http
      .get(baseURL + '/get-property-details/' + propertyId, httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }
  handleError(error: HttpErrorResponse) {
    console.log('auth service: Error occurred...');
    console.error(error);
    return of(error);
  }
}
