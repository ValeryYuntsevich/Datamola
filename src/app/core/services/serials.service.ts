import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export type ItemSereal = { 
  name: string;
  date: number;
  season: number;
  symbol: string;
  genres: string[];
}

@Injectable({
  providedIn: 'root'
})

export class SerialsService {

  jsonURL = 'assets/data/data.json';
  
  constructor(
    private http: HttpClient) { }

  getJSON() {
    return this.http
      .get(this.jsonURL).pipe(
        map(data => data as Array<ItemSereal>)
      )
  }

}


