import { Component } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { AboutUsComponent } from '../about-us/about-us.component';
import { matchSorter } from "match-sorter";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  restaurants: Object[]
  searchText:string
  tagSearch:string
  filterBySearchText = () =>
  matchSorter(this.restaurants, this.searchText, { keys: ["name", "tags"] });
  filterByTagText = () =>
  matchSorter(this.restaurants, this.tagSearch, {
    threshold: matchSorter.rankings.EQUAL,
    keys: ["tags"],
  });
  constructor(private storage: StorageService) {}

}
