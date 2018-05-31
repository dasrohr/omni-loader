import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { Video } from "./video.model";

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

  createDownloadTask( videos: Video[] ) {
    console.log('create task');
    for ( var video of videos ) {
      console.log(video);
      this.http.post( this.apiUrl + '/task/download', video ).subscribe( data => console.log(data))
    }
  }
}