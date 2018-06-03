import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { VideoService } from './video.service';
import { OmniApiService } from './api.service';

@Component({
  selector: 'app-job-creator',
  templateUrl: './job-creator.component.html',
  styleUrls: ['./job-creator.component.css'],
  providers: [ VideoService, OmniApiService ]
})
export class JobCreatorComponent implements OnInit {
  inputForm :FormGroup;
  formText :{};
  albartAvailable :string[];
  albAvailable :string[];

  constructor(
    private videoService: VideoService,
    private omniApiService : OmniApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formText = {
      videos: 'Video ID',
      playlistItems: 'Playlist ID',
      search: 'Search String'
    };

    this.inputForm = this.formBuilder.group({
      target: 'videos',
      input: undefined,
      albart: undefined,
      alb: undefined,
    });

    this.omniApiService.getExistingAlbart();
    this.omniApiService.albartDataReceived.subscribe( ( data :string[] ) => {
      this.albartAvailable = data;
    });

    this.omniApiService.albDataReceived.subscribe( ( data :string[] ) => {
      this.albAvailable = data;
    });

    this.omniApiService.tasksCreated.subscribe( () => this.formRebuild() );

    this.inputForm.get('alb').disable();
    this.formChanges();
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

  onAlbartSelected() {
    console.log('selected')
    this.omniApiService.getExistingAlb( this.inputForm.value.alb );
  }

  formRebuild() {
    this.inputForm.reset({
      target: 'videos',
      input: undefined,
      albart: undefined,
      alb: undefined
    });
    this.albAvailable = [];
    this.albartAvailable = [];
    this.videoService.clearSelectedVideos();
    this.omniApiService.getExistingAlbart();
  }

  formChanges() {
    this.inputForm.get('albart').valueChanges.subscribe( value => {
      if ( value ) {
        this.inputForm.get('alb').enable();
      } else {
        this.inputForm.get('alb').disable();
      }
    })
  }

}