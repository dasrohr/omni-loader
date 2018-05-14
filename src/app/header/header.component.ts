import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
navigation :EventEmitter<String>;

  @Output() navigate = new EventEmitter<String>();

  onNavigate(selection: string) {
    this.navigate.emit(selection);
  }

  constructor() { }

  ngOnInit() {
  }


}
