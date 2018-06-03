import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private router :Router,
    private videoService :VideoService,
    private omniApiService : OmniApiService
  ) {}

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

  onDownload() {
    console.log( this.videos )
    this.omniApiService.createDownloadTasks( this.selectedVideos )
    this.router.navigate( ['/job'] );
  }

  onSelectVideo( video :Video ) {
    if ( this.selectedVideos.indexOf( video ) === -1 ) {
      this.videoService.addSelectedVideo( video );
    } else {
      this.videoService.removeSelectedVideo( video );
    }
  }

  onSelectAll() {
    for ( var video of this.videos ) {
      if ( this.selectedVideos.indexOf( video ) === -1 ) {
        this.videoService.addSelectedVideo( video );
      }
    }
  }

  onUnselectAll() {

  }

}
