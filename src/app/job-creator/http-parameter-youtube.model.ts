import { HttpParams } from "@angular/common/http";

class HttpParameter {
  public httpParams :HttpParams;
  public part :string;
  public key :string;
  public maxResults :number;

  constructor() {
    this.httpParams = new HttpParams()
      .set('part', 'snippet')
      .set('key', 'AIzaSyDKD9Dk8B1Jvbzu1xc10KRgmFoNZ1tfZgs')
      .set('maxResults', '50');
  }

  params() {
    return this.httpParams;
  }

}

export class HttpParameterVideoId extends HttpParameter {
  public id :string;

  constructor(id : string) {
    super();
    this.httpParams = this.httpParams.set('id', id);
  }
}

export class HttpParameterPlaylistId extends HttpParameter {
  public id :string;

  constructor(playlistId : string) {
    super();
    this.httpParams = this.httpParams.set('id', playlistId);
  }
}

export class HttpParameterPlaylistItems extends HttpParameter {
  public playlistId :string;

  constructor(playlistId : string) {
    super();
    this.httpParams = this.httpParams.set('playlistId', playlistId);
  }
}

export class HttpParameterSearch extends HttpParameter {
  public searchString :string;

  constructor(searchString :string, maxResults :string = '20') {
    super();
    this.httpParams = this.httpParams.set('maxResults', maxResults)
                                     .set('type', 'video')
                                     .set('q', searchString);
  }
}