import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { apiInfo } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public isLoading = new BehaviorSubject<boolean>(false);

  constructor(private service: ApiService) { }

  getGalleryListing() {
    return new Promise((resolve, reject) => {
      this.service
        .get(apiInfo.info.galleryListing)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  postContactUs(postObj: any) {
    return new Promise((resolve, reject) => {
      this.service
        .post(apiInfo.info.contactUs, postObj)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
