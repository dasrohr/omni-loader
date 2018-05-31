import { Component, OnInit } from '@angular/core';

import { Video } from '../video.model';
import { VideoService } from '../video.service';
import { OmniApiService } from '../api.service';

@Component({
  selector: 'app-job-selector',
  templateUrl: './job-selector.component.html',
  styleUrls: ['./job-selector.component.css']
})
export class JobSelectorComponent implements OnInit {
  videos :Video[];
  selectedVideos :Video[] = [];
  selectedIds :Array<string> = [];

  loading :string;

  constructor(private videoService :VideoService, private omniApiService : OmniApiService) {}

  ngOnInit() {
    this.videos = this.videoService.getVideos();
    this.videoService.videoDataReceived.subscribe( (videos :Video[]) => {
      this.videos = videos;
    });

    this.selectedVideos = this.videoService.getSelectedVideos();
    this.videoService.selectedVideosChanged.subscribe( ( selectedVideos :Video[] ) => {
      this.selectedVideos = selectedVideos;
    })

    this.videoService.apiLoading.subscribe( (state :string) => {
      this.loading = state;
    });
  }

  onClick() {
    console.log(this.selectedVideos);
    this.omniApiService.createDownloadTask( this.selectedVideos );
  }

  onSelectVideo( video :Video ) {
    if ( this.selectedVideos.indexOf( video ) === -1 ) {
      this.videoService.addSelectedVideo( video );
    } else {
      this.videoService.removeSelectedVideo( video );
    }
  }
  // onSelectVideo(video :Video) {
  //   var indexVideo = this.selectedVideos.indexOf(video);
  //   var indexId = this.selectedIds.indexOf(video.id);
  //   if (indexId !== -1) {
  //     this.selectedVideos.splice(indexVideo, 1);
  //     this.selectedIds.splice(indexId, 1);
  //   } else {
  //     this.selectedVideos.push(video);
  //     this.selectedIds.push(video.id);
  //   }
  // }
}
