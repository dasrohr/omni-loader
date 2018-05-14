import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit {
  apiKey : String = 'AIzaSyDKD9Dk8B1Jvbzu1xc10KRgmFoNZ1tfZgs';

  urlInputActive = true;
  vidInputActive = true;
  pidInputActive = true;
  searchInputActive = true;
  submitButtonActive = false;

  validVid :boolean = false;
  validUrl :boolean = false;
  validPid :boolean = false;
  validSearch: boolean = false;

  url : String = null;
  vid : String = null;
  pid : String = null;
  search : String = null;

  albart : String = '';
  alb : String = '';
  force :boolean = false;

  title : String;
  source : string = null;

  searchResultId : String;
  searchResultPlaylistItems : any;
  searchResultPlaylistInfo : any;
  searchResultStringItems : any;

  listSelectionState : boolean = true;

  constructor(private http: HttpClient) {}
  
  ngOnInit() {
  }

  onUpdateInput() {
    if (this.url) {
      this.vidInputActive = false;
      this.pidInputActive = false;
      this.searchInputActive = false;
      this.submitButtonActive = true;
    } else if (this.vid) {
      this.urlInputActive = false;
      this.pidInputActive = false;
      this.searchInputActive = false;

      this.submitButtonActive = true;
    } else if (this.pid) {
      this.urlInputActive = false;
      this.vidInputActive = false;
      this.searchInputActive = false;
      this.submitButtonActive = true;
    } else if (this.search) {
      this.urlInputActive = false;
      this.vidInputActive = false;
      this.pidInputActive = false;
      this.submitButtonActive = true;
    } else {
      this.urlInputActive = true;
      this.vidInputActive = true;
      this.pidInputActive = true;
      this.submitButtonActive = false;
    }
  }
  
  onResetInput() {
    this.urlInputActive = true;
    this.vidInputActive = true;
    this.pidInputActive = true;
    this.searchInputActive = true;
    this.submitButtonActive = false;
    this.validVid = false;
    this.validPid = false;
    this.validSearch = false;
  }

  analyse() {
    if (this.url) {
      console.log('analyse url')
    } else if (this.vid) {
      this.http.get('https://www.googleapis.com/youtube/v3/videos?id=' + this.vid + '&part=snippet&key=' + this.apiKey)
      .subscribe((data :any) => {
        if(data.pageInfo.totalResults != 0){
          this.validVid = true;
          this.source = 'youtube';
          this.title = data.items[0].snippet.title;
        } else {
          this.validVid = false;
        }
      });
    } else if (this.pid) {
      this.http.get('https://www.googleapis.com/youtube/v3/playlists?id=' + this.pid + '&part=snippet&maxResults=50&key=' + this.apiKey)
      .subscribe((data:any) => {
        if (data.pageInfo.totalResults != 0) {
          this.validPid = true;
          this.source = 'youtube';
          this.searchResultPlaylistInfo = data.items;
        } else {
          this.validPid = false;
          console.log('error with playlist');
        }
      })

      this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?playlistId=' + this.pid + '&part=snippet&maxResults=50&key=' + this.apiKey)
      .subscribe((data:any) => {
        if (data.pageInfo.totalResults != 0) {
          this.validPid = true;
          this.source = 'youtube';
          this.searchResultPlaylistItems = data.items;
        } else {
          this.validPid = false;
          console.log('error with playlist');
        }
      })
    } else if (this.search) {
      this.http.get('https://www.googleapis.com/youtube/v3/search?q=' + this.search + '&type=video&part=snippet&maxResults=5&key=' + this.apiKey)
      .subscribe((data:any) => {
        if (data.pageInfo.totalResults != 0) {
          this.validSearch = true;
          this.searchResultStringItems = data.items;
          console.log(this.searchResultStringItems)
        } else {
          this.validSearch = false;
          console.log('error with search string');
        }
      })
    }
  }

  validInput() {
    if (this.validVid === true || this.validUrl === true || this.validPid === true || this.validSearch == true) {
      return true
    } else {
      return false
    }
  }

  showMe(data:any){
    console.log(data)
  }

  submit() {
    var today = new Date();
    var metaData = {
      albart: this.albart,
      alb: this.alb,
      date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      playlist: false,
      playlist_id: false,
      source: this.source,
      enforceFolder: this.force,
      data: {}
    }

    if (this.validPid) {
      metaData.playlist = this.searchResultPlaylistInfo[0].snippet.title;
      metaData.playlist_id = this.searchResultPlaylistInfo[0].id;
      for (var i = 0; i < this.searchResultPlaylistItems.length; i++) {
        if (this.searchResultPlaylistItems[i].selected) {
          var item = metaData;
          item.data = { id: this.searchResultPlaylistItems[i].snippet.resourceId.videoId, title: this.searchResultPlaylistItems[i].snippet.title, url: 'https://www.youtube.com?v=' + this.searchResultPlaylistItems[i].snippet.resourceId.videoId };
          this.http.post('http://die-vvj.de:3000/task/download', item, { headers: {'Content-Type': "application/json"} }).subscribe((apiResponse) => {
          })
        }
      }
    } else if (this.validSearch){
      for (var i = 0; i < this.searchResultStringItems.length; i++) {
        if (this.searchResultStringItems[i].selected) {
          var item = metaData;
          item.data = { id: this.searchResultStringItems[i].id.videoId, title: this.searchResultStringItems[i].snippet.title, url: 'https://www.youtube.com?v=' + this.searchResultStringItems[i].id.videoId };
          this.http.post('http://die-vvj.de:3000/task/download', item, { headers: {'Content-Type': "application/json"} }).subscribe((apiResponse) => {
          })
        }
      }
    }

  this.onResetInput();
  }

selectAll() {
  if (this.validPid) {
    this.searchResultPlaylistItems.forEach((result: any) => {
      result.selected = this.listSelectionState;
    });
  } else if (this.validSearch) {
    this.searchResultStringItems.forEach((result: any) => {
      result.selected = this.listSelectionState;
    });
  }
}

countSelected() {
  var count : number = 0;
  if (this.validPid && this.searchResultPlaylistItems) {
    this.searchResultPlaylistItems.forEach((result: any) => {
      if (result.selected) { count++ }
    });
  } else if (this.validSearch && this.searchResultStringItems) {
    this.searchResultStringItems.forEach((result: any) => {
      if (result.selected) { count++ }
    });
  }
  return count;
}

  log(val) {
    console.log(val);
  }
}
