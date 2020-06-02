import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
//filter function
   dataSource = new MatTableDataSource();
   applyFilter(filterValue :string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  

  }

  constructor() { }

  ngOnInit() {
  }

}
