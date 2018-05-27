import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  apiRoot : string = environment.apiProtocol + '://' + environment.apiHost + ':' + environment.apiPort;

  activeTasks = [];
  queuedTasks = [];
  loadingTasks : boolean = false;
  autoReload : boolean = false;

  constructor(private http: HttpClient) { 
  }

  ngOnInit() {
    this.getTasks(true);
    setInterval(() => { 
      this.getTasks(this.autoReload);
     }, 15000);
  }

  getTasks(enabled: boolean) {
    if (!this.loadingTasks && enabled) {
      this.loadingTasks = true;
      this.http.get(this.apiRoot + '/task/queue/all').subscribe((data:any) => {
        if (data.data.active.length > 0 || data.data.queued.length > 0) {
          console.log(data);
          this.activeTasks = data.data.active;
          this.activeTasks[0].args = JSON.parse(this.activeTasks[0].args.slice(1, -1).replace(/'/g, '"').replace(/False/g, false).replace(/None/g, false));
          console.log(this.activeTasks);
          this.queuedTasks = data.data.queued;

          for (var i = 0; i < this.queuedTasks.length; i++ ) {
            this.queuedTasks[i].args = JSON.parse(this.queuedTasks[i].args.slice(1, -1).replace(/'/g, '"').replace(/False/g, false).replace(/None/g, false));          
          }

        } else {
          this.activeTasks = [];
          this.queuedTasks = [];
        }
        this.loadingTasks = false;        
      });
    }
  }

  activeRefresh() {
    return this.loadingTasks;
  }

}

// 