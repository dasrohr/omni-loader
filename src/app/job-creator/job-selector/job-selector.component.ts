import { Component, OnInit } from '@angular/core';

import { Video } from '../video.model';
import { VideoService } from '../video.service';

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

  constructor(private videoService :VideoService) { }

  ngOnInit() {
    this.videos = this.videoService.getVideos();
    this.videoService.videoDataReceived.subscribe( (videos :Video[]) => {
      this.videos = videos;
    });

    this.videoService.apiLoading.subscribe( (state :string) => {
      this.loading = state;
    });
  }

  onClick() {
    console.log(this.selectedVideos);
  }

  onSelectVideo(video :Video) {
    var indexVideo = this.selectedVideos.indexOf(video);
    var indexId = this.selectedIds.indexOf(video.id);
    if (indexId !== -1) {
      this.selectedVideos.splice(indexVideo, 1);
      this.selectedIds.splice(indexId, 1);
    } else {
      this.selectedVideos.push(video);
      this.selectedIds.push(video.id);
    }
  }
}
