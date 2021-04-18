import { Component, Input, OnInit } from '@angular/core';


import { IRestaurant } from "../models/restaurant"
import { StorageService } from '../storage.service';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-resto',
  templateUrl: './add-resto.component.html',
  styleUrls: ['./add-resto.component.scss'],
})
export class AddRestoComponent implements OnInit {
  mongoObjectId  = function (): string {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  };
  
  getLoc =  () =>{
    let coords = {long: (Math.random() * ((-79.3) - (-79.4)) + (-79.4)), lat:(Math.random() * ((43.8) - (43.6)) + (43.6))};
   return  coords
  }
  
  @Input() selectedResto 
  @Input() close
  @Input() getRestos : () => void;
  restoForm = new FormGroup({
    name: new FormControl(""),
    address: new FormControl(''),
    phone: new FormControl(''),
    desc: new FormControl(''),
    tags: new FormControl(''),

  });
  formData: IRestaurant
  constructor(private storage: StorageService) {
    setTimeout(()=>{
      
      console.log(this.selectedResto)
     if(this.selectedResto != null){

       this.restoForm = new FormGroup({
       name: new FormControl(this.selectedResto.key.name),
       address: new FormControl(this.selectedResto.key.address),
       phone: new FormControl(this.selectedResto.key.phone),
       desc: new FormControl(this.selectedResto.key.desc),
       tags: new FormControl(this.selectedResto.key.tags.join(" ")),

      });
    } 
   },100)
    
   }

  ngOnInit() {}
  handleSubmit = ()=>{
    console.log(this.selectedResto)
   let coords = {...this.getLoc()}
    this.formData = {
      value: this.selectedResto?this.selectedResto.value : this.mongoObjectId(),
      key:{
        ...this.restoForm.value,
        lat: coords.lat,
        long: coords.long,
        tags: this.restoForm.value.tags.split(" "),
        stars: 3.5,
        edited: true
      }
    
    }
    console.log(this.formData)
    this.storage.set(this.formData.value, this.formData.key)
    this.storage._storage.forEach((key, value, index) => {
      console.log(key)
      console.log(value)
     
    });
    this.selectedResto = null
    this.restoForm =  new FormGroup({
      name: new FormControl(""),
      address: new FormControl(''),
      phone: new FormControl(''),
      desc: new FormControl(''),
      tags: new FormControl(''),
  
    });
    this.close.close()

  }

}
