import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 1;
  public pageDisplay: number = 10;
  public totalRow: number;
  public filter: string = '';
  public roles: any[];
  public searchName: string;
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    console.log(this.searchName);
    if (this.searchName !== undefined) {
      this.filter = this.searchName;
    }
    this.dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter).subscribe((response: any) => {
      console.log(response);
      this.roles = response.Items;
      this.pageIndex = response.PageIndex;
      this.pageSize = response.PageSize;
      this.totalRow = response.TotalRows;
    });
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }
}
