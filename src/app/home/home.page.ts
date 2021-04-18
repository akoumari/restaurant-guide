
import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../storage.service';
import { AboutUsComponent } from '../about-us/about-us.component';
import { IRestaurant } from '../models/restaurant';
import { matchSorter } from "match-sorter";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StarRatingComponent } from 'ng-starrating';
import { GoogleMapComponent } from '../google-maps/google-maps.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(GoogleMapComponent) mapComponent: GoogleMapComponent;
  testMarker(){

    let center = this.mapComponent.map.getCenter();
    this.mapComponent.addMarker(center.lat(), center.lng(), "You");

}
  restaurants: IRestaurant[] = []
  searchText:string
  tagSearch:string
  page: number
  totalstars: number
  pageSize: number
  closeResult = '';
  collectionSize:number
  selectedResto: IRestaurant
  
  
  constructor(private storage: StorageService, private modalService: NgbModal) {
    this.page = 1
    this.pageSize = 6
    this.totalstars = 5
    this.searchText = ""
    this.tagSearch = ""
    setTimeout(()=>{
      this.getRestos()
      this.testMarker()
    },1000)
    setInterval(()=>{
      this.getRestos()
      
    },1000)
    
  }




  filterBySearchText = () =>{
this.restaurants = [...matchSorter(this.restaurants, this.searchText, { keys: ["key.name", "key.tags"] })]
  
}

filterByTagText = () =>{
  this.restaurants = [...matchSorter(this.restaurants, this.tagSearch, {
    threshold: matchSorter.rankings.EQUAL,
    keys: ["key.tags"],
  })]
}

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

  handleTag(tag){
    console.log(tag)
    this.tagSearch = tag
    this.filterByTagText()
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}, resto) {
       
      this.storage.set(resto.value, {...resto.key, stars: $event.newValue})
      this.restaurants = [...this.restaurants.filter(gtag => (gtag.value!==resto.value)), {key:{...resto.key, stars: $event.newValue},value: resto.value}].sort(function(a, b)
      {
        var nameA = a.key.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.key.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
  }

  clearTagAndSearch(){
    this.tagSearch = ""
    this.searchText = ""
  }

  ngOnInit(): void {
   
    // setTimeout(()=>{
    //   this.getRestos()
    //   this.page = 1
    //   this.pageSize = 6
    // },1000)
    // this.getRestos()
  }
  handleMarker(resto): void{
    
  }
  
  getRestos() : void {
    console.log('LOL')
  console.log(this.searchText)
    if(!this.tagSearch && !this.searchText){
      this.storage._storage.forEach((key, value, index) => {
      // console.log(key)
      // console.log(value)
      if(this.restaurants.filter(gtag => (gtag.value==value)).length <=0 ){
        this.restaurants.push({key,value})
this.restaurants.sort(function(a, b){
  
  var nameA = a.key.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.key.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
        this.collectionSize = this.restaurants.length
      }else if(key.edited == true){
        this.storage.set(value, {...key, edited: false})
        this.selectedResto = null
        this.restaurants = [...this.restaurants.filter(gtag => (gtag.value!==value)), {key:{...key, edited: false},value}].sort(function(a, b){
  
          var nameA = a.key.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.key.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        
          // names must be equal
          return 0;
        });
      }
      // this.resta}urants = [...this.restaurants.filter(gtag => (gtag.value==value)),{key,value}]
    });
  }if(this.searchText != ""){
this.filterBySearchText()
  }
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
  this.mapComponent.addMarker( resto.key.lat, resto.key.long, resto.key.name)

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
