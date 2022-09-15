import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: any

  ) { }

  getData() {
    const url = this.apiUrl;
    return this.http.get(url).toPromise();
  }

  saveData(domain: any) {
    const url = this.apiUrl;
    return this.http.post(url, { url: domain }).toPromise();
  }

  updateData(id: any, domain: any) {
    const url = this.apiUrl;
    return this.http.put(url, { id, url:domain }).toPromise();
  }
}
