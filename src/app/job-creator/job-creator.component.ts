import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { VideoService } from './video.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-creator',
  templateUrl: './job-creator.component.html',
  styleUrls: ['./job-creator.component.css'],
  providers: [VideoService]
})
export class JobCreatorComponent implements OnInit {
  inputForm :FormGroup;
  formText :{};

  constructor(private videoService: VideoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.formText = {
      videos: 'Video ID',
      playlistItems: 'Playlist ID',
      search: 'Search String'
    }

    this.inputForm = this.formBuilder.group({
      target: 'videos',
      input: undefined,
      albart: undefined,
      alb: undefined
    })
  }

  onCollectInformation() {
    var id = this.inputForm.value.input;
    var scope = this.inputForm.value.target;
    var albart = this.inputForm.value.albart;
    var alb = this.inputForm.value.alb;
    if (id) {
      this.videoService.callAPI(id, scope, undefined, albart, alb);
      this.router.navigate(['select'], { relativeTo: this.route });
    } else {
      console.log('missing id');
    }
  }

}