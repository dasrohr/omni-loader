import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private http: HttpClient) { }

  history : {}[];

  ngOnInit() {
    this.http.get('http://localhost:3000/history').subscribe((data:any) => {
      this.history = data;
    })
  }

}
