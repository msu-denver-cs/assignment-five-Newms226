import { Component, OnInit, Input } from '@angular/core';
import { Make } from '../make.model';

@Component({
  selector: 'app-make-display',
  templateUrl: './make-display.component.html',
  styleUrls: ['./make-display.component.css']
})
export class MakeDisplayComponent implements OnInit {
  @Input() make: Make;

  constructor() { }

  ngOnInit() {
  }

}
