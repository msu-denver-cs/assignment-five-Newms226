import { Component, OnInit } from '@angular/core';
import { Part } from '../part.model';
import { ApiService } from 'src/app/api/api-service.service';
import { AbstractListComponent } from 'src/app/api/list/list.component';
import { MakeSearchService } from 'src/app/makes/make-search.service';
import { PartParams, PartSearchService } from '../part-search.service';

@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css']
})
export class PartListComponent extends AbstractListComponent<Part, PartParams> {


  constructor(search: PartSearchService) {
    super(search);
   }

}
