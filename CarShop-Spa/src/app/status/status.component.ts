import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';

export interface Status {
  status: string;
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  status: Status;

  constructor(private apiService: ApiService) { 
    this.status = { status: '' };
  }

  showStatus() {
    this.apiService.getStatus().subscribe((data) => {
      this.status = { status: data['status'] };
    });
  }

  ngOnInit() {
    this.showStatus();
  }

}
