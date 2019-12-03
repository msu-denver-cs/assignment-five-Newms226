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
  // makes: Make[]
  // page: Number
  // order: String

  constructor(search: MakeSearchService) { 
    super(search);
  }

  // ngOnInit() {
  //   this.page = 1
  //   this.order = 'name'
  //   this.update_makes()
  // }

  // update_makes() {
  //   this.apiService.get_makes(this.page, this.order).subscribe((data: Array<Make>) =>
  //     this.makes = data.map(make => {
  //       return new Make(
  //         make['id'],
  //         make['name'],
  //         make['country'],
  //         make['created_at'],
  //         make['updated_at'],
  //         make['url']
  //       )
  //     })
  //   )
  // }

}
