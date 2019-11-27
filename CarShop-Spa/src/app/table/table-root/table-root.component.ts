import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/api/api-service.service';
import { APIResponse, APIMeta } from 'src/app/api/query/query-response.model';

@Component({
  selector: 'app-table-root',
  templateUrl: './table-root.component.html',
  styleUrls: ['./table-root.component.css']
})
export class TableRootComponent<T> implements OnInit {
  private response: APIResponse<T>;

  constructor(private http: HttpClient, private apiService: ApiService) { }

  ngOnInit() {
    this.response = {
      meta: { total: 0 },
      data: []
    };
  }

  

}
