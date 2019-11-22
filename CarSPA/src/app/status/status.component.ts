import { Component, OnInit } from '@angular/core';
import { StatusService } from './status.service';
import { Status } from './status.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  status: String;

  constructor(private statusService: StatusService) { 
    // this.status = statusService.get_status();
    console.log('HERE');
    // console.log(this.status);
    this.showStatus();
  }

  showStatus() {
    this.statusService.get_status().subscribe((data: Status) => this.status = data['data']);
  }

  ngOnInit() {
  }

}
