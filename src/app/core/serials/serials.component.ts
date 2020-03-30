import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SerialsService } from '../services/serials.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-serials',
  templateUrl: './serials.component.html',
  styleUrls: ['./serials.component.css']
})

export class SerialsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'season', 'network', 'date'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  allItems:number;

  nameFilter = new FormControl('');
  seasonFilter = new FormControl('');
  dateFilter = new FormControl('');

  filterValues = {
    name: '',
    season: '',
    date: ''
  };

  constructor(
    private serials: SerialsService, 
    private router: Router) { }

  ngOnInit(): void {
    this.initTable();

    this.nameFilter.valueChanges
    .subscribe(
      name => {
        this.addQueryParams('name',name);
        this.filterValues['name'] = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    );

    this.seasonFilter.valueChanges
    .subscribe(
      season => {
        this.addQueryParams('season',season);
        this.filterValues['season'] = season;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.dateFilter.valueChanges
    .subscribe(
      date => {
        this.addQueryParams('date',date);
        this.filterValues['date'] = date;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
  }

  addQueryParams(names, data) {
    this.router.navigate([], {
      queryParams: {
        [names]: data ? data : null
      },
      queryParamsHandling: 'merge',
    });
  }


initTable() {
  this.serials.getJSON().subscribe(data =>{
    this.dataSource.data = data;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
    this.allItems = data.length;
    this.setQueryParams();
  });
}

createFilter(): (data: any, filter: string) => boolean {
  let filterFunction = function(data, filter): boolean {
    let searchTerms = JSON.parse(filter);
    return data.season.toString().trim().indexOf(searchTerms.season) !== -1 && 
    data.date.toString().trim().indexOf(searchTerms.date) !== -1 && 
    data.name.toString().trim().toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1;
  }
  return filterFunction;
}

  getColor(genre) {
    switch (genre) {
      case 'thriller':
        return '#545454';
      case 'fantasy':
        return '#bd70da';
      case 'drama':
        return '#eb5c5d';
      case 'detective':
        return '#be71d8';
      case 'crime':
        return '#f39d4f';
      default:
        return '#424242';
    }
  }

  setQueryParams(event?) {
   const pageSize = event ? event.pageSize : 5;
   this.addQueryParams('pageSize', pageSize)
  }

}

