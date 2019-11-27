import { Component, OnInit, Input } from '@angular/core';
import { Part } from '../part.model';

@Component({
  selector: 'app-part-display',
  templateUrl: './part-display.component.html',
  styleUrls: ['./part-display.component.css']
})
export class PartDisplayComponent implements OnInit {
  @Input() part: Part

  constructor() { }

  ngOnInit() {
  }

}
