import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl = "http://127.0.0.1:5000/api/";
  constructor(private http: HttpClient) { }

  login(obj: any) {
    return this.http.post(this.apiUrl + "users/sign-in", obj);
  }

  register(obj: any) {
    return this.http.post(this.apiUrl + "users/sign-up", obj);
  }


  getDishes() {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('x-access-token', authToken || '');
    return this.http.get(this.apiUrl + 'food/view', { headers });
  }


  getAllFood() {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('x-access-token', authToken || '');
    return this.http.get(this.apiUrl + "food/view", { headers });
  }

}
