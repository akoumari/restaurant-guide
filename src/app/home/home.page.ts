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
  selectedResto: IRestaurant
  filterBySearchText = () =>
  matchSorter(this.restaurants, this.searchText, { keys: ["name", "tags"] });
  filterByTagText = () =>
  matchSorter(this.restaurants, this.tagSearch, {
    threshold: matchSorter.rankings.EQUAL,
    keys: ["tags"],
  });
  public editLoc = (key): void=>{
    this.storage._storage.set(key,{...this.restaurants.filter(k=> k.value == key)[0].key,stars:0})
    this.restaurants = []
    this.getRestos()
    this.collectionSize = this.restaurants.length
  }
  public deleteLoc = (key): void=>{
    this.storage._storage.remove(key)
    this.restaurants = this.restaurants.filter(loc => loc["value"] != key) 
    this.collectionSize = this.restaurants.length
  }
  constructor(private storage: StorageService, private modalService: NgbModal) {
    this.page = 1
    this.pageSize = 6
    setTimeout(()=>{
      this.getRestos()
    },1000)
    setInterval(()=>{
      this.getRestos()
      
    },1000)
    
  }
  
  ngOnInit(): void {
    
    // setTimeout(()=>{
    //   this.getRestos()
    //   this.page = 1
    //   this.pageSize = 6
    // },1000)
    // this.getRestos()
  }
  getRestos() : void {
    console.log('LOL')
  
    this.storage._storage.forEach((key, value, index) => {
      // console.log(key)
      // console.log(value)
      if(this.restaurants.filter(gtag => (gtag.value==value)).length <=0){
        this.restaurants.push({key,value})

        this.collectionSize = this.restaurants.length
      }
      // this.restaurants = [...this.restaurants.filter(gtag => (gtag.value==value)),{key,value}]
    });
  }
  open(content, resto) {
    // this.storage._storage.forEach((key, value, index) => {
    //   console.log(key)
    //   console.log(value)
      
    //   //this.restaurants = [...this.restaurants,{key,value}]
    // });
    // console.log(this.storage)
if(resto){
  this.selectedResto = resto
  console.log(resto)
}
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
