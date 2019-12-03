import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api-service.service';
import { Make } from '../make.model';
import { AbstractListComponent } from 'src/app/api/list/list.component';
import { MakeParams, MakeSearchService } from '../make-search.service';

@Component({
  selector: 'app-make-list',
  templateUrl: './make-list.component.html',
  styleUrls: ['./make-list.component.css']
})
export class MakeListComponent extends AbstractListComponent<Make, MakeParams> {
  constructor(search: MakeSearchService) { 
    super(search);
  }

  
}
