import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const hostname = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  options;

  constructor(private http: HttpClient) {
    const headers = new HttpHeaders();
    this.options = { headers };
  }

  /**
   * Used for calling GET method on server and pass API url in calling function
   * @param endpoint
   */
  get(endpoint) {
    return new Promise((resolve, reject) => {
      this.http.get(hostname + endpoint, this.options).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  post(endpoint, body, headers = []) {
    console.log('headers',headers);
    if (headers.length) {
      const that = this;
      headers.forEach(function(key, val) {
        that.options.headers.set(key.key, key.name);
      });
    }
    return new Promise((resolve, reject) => {
      this.http.post(hostname + endpoint, body, this.options).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * Used for calling DELETE method on server and pass API url/ POST Data / Header Options in calling function
   * @param endpoint
   */
  delete(endpoint, body, headers = []) {
    if (headers.length) {
      const that = this;
      headers.forEach(function(key, val) {
        that.options.headers.set(key.key, key.name);
      });
    }
    this.options.body = body;
    return new Promise((resolve, reject) => {
      this.http.delete(hostname + endpoint, this.options).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
