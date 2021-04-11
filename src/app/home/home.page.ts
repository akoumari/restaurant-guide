import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { AboutUsComponent } from '../about-us/about-us.component';
import { IRestaurant } from '../models/restaurant';
import { matchSorter } from "match-sorter";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  restaurants: IRestaurant[] = []
  searchText:string
  tagSearch:string
  page: number
  pageSize: number
  closeResult = '';
  collectionSize:number
  filterBySearchText = () =>
  matchSorter(this.restaurants, this.searchText, { keys: ["name", "tags"] });
  filterByTagText = () =>
  matchSorter(this.restaurants, this.tagSearch, {
    threshold: matchSorter.rankings.EQUAL,
    keys: ["tags"],
  });
  constructor(private storage: StorageService, private modalService: NgbModal) {
    setTimeout(()=>{
      this.getRestos()
    },1000)
  }
  
  ngOnInit(): void {
    
    // this.getRestos()
    this.page = 1
    this.pageSize = 6
  }
  getRestos() : void {
    this.storage._storage.forEach((key, value, index) => {
      console.log(key)
      console.log(value)
      
      this.restaurants = [...this.restaurants,{key,value}]
    });
  }
  open(content) {
    this.storage._storage.forEach((key, value, index) => {
      console.log(key)
      console.log(value)
      
      //this.restaurants = [...this.restaurants,{key,value}]
    });
    console.log(this.storage)

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
