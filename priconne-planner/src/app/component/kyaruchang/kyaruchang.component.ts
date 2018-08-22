import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-kyaruchang',
  templateUrl: './kyaruchang.component.html',
  styleUrls: ['./kyaruchang.component.css']
})
export class KyaruchangComponent implements OnInit {

  moving = false

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.moving = !this.moving
  }

}
