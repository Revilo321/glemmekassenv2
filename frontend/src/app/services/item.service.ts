import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../constants/apiUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get(`${apiUrl}/api/items`);
  }

  createItem(formData: any) {
    return this.http.post(`${apiUrl}/api/items`,formData);
  }

  getFilteredItems(zipcode: string): Observable<any>{
    return this.http.get(`${apiUrl}/api/items?zipcode=${zipcode}`);
  }
}
