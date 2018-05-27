import { Injectable, EventEmitter } from "@angular/core";

import { Video } from "./video.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpParameterVideoId, HttpParameterPlaylistId, HttpParameterSearch } from "./http-parameter-youtube.model";

@Injectable()
export class VideoService {
  private videos: Video[] = [];
  videoDataReceived = new EventEmitter<Video[]>();
  apiLoading = new EventEmitter<string>();

  constructor(private http :HttpClient) {}

  getVideos() {
    return this.videos.slice();
  }

  addVideo(newVideo :Video) {
    this.videos.push(newVideo);
    this.videoDataReceived.emit(this.getVideos());
  }

  callAPI(id: string, scope :string, provider: string) {

    var httpParams;
    
    this.apiLoading.emit('loading');

    this.videos = [];
    this.videoDataReceived.emit(this.videos);


    if (scope === 'videos') {
      httpParams = new HttpParameterVideoId(id);
    } else if (scope === 'playlistItems') {
      httpParams = new HttpParameterPlaylistId(id);
    } else if (scope === 'search') {
      httpParams = new HttpParameterSearch(id);
    }

    this.http.get('https://www.googleapis.com/youtube/v3/' + scope, {params: httpParams.httpParams})
    .subscribe( (data :any) => {
      console.log(data)
      if (data.items.length !== 0) {
        for (var result of data.items) {
          var id = result.snippet.resourceId ? result.snippet.resourceId : result.id;
          var title = result.snippet.title;
          var provider = null;
          var imageUrl = result.snippet.thumbnails.medium.url;

          this.addVideo(new Video(id, title, provider, imageUrl));
        }
      }
      this.apiLoading.emit('loaded');
    });
  }
}