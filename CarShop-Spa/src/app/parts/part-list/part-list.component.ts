import { Component, OnInit } from '@angular/core';
import { Part } from '../part.model';
import { ApiService } from 'src/app/api/api-service.service';

@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css']
})
export class PartListComponent implements OnInit {
  parts: Part[]
  page: Number

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.page = 1
    this.updateParts()
  }

  updateParts() {
    this.apiService.get_parts(this.page, undefined).subscribe((data: Array<Part>) =>
      this.parts = data.map(part => {
        return new Part(
          part['id'],
          part['name'],
          part['url'],
          part['created_at'],
          part['updated_at']
        )
      })
    )
  }

}
