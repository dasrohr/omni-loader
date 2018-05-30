import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";

@Injectable()
export class OmniApiService {
  private apiUrl = 'http://' + environment.api.host + ':' + environment.api.port;
  albartDataReceived = new EventEmitter<{}>();
  albDataReceived = new EventEmitter<{}>();

  constructor(private http :HttpClient) {}

  getExistingAlbart() {
    this.http.get( this.apiUrl + '/fs/folders' ).subscribe( ( response :any ) => {
      this.albartDataReceived.emit(response.data);
    });
  }

  getExistingAlb( albart :string ) {
    console.log('triggered get Album with ', albart)
    this.http.get( this.apiUrl + '/fs/folders', { params: { depth: albart } } ).subscribe ( ( response :any ) => {
      this.albDataReceived.emit( response.data );
    })
  }
}