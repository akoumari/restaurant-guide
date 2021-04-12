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
  
  
  
  @Input() close
  @Input() getRestos : () => void;
  restoForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    desc: new FormControl(''),
    tags: new FormControl(''),
    long: new FormControl(''),
    lat: new FormControl(''),
  });
  formData: IRestaurant
  constructor(private storage: StorageService) { }

  ngOnInit() {}
  handleSubmit = ()=>{
    this.formData = {
      value: this.mongoObjectId(),
      key:{
        ...this.restoForm.value,
        tags: this.restoForm.value.tags.split(" ")
      }
    
    }
    console.log(this.formData)
    this.storage.set(this.formData.value, this.formData.key)
    this.storage._storage.forEach((key, value, index) => {
      console.log(key)
      console.log(value)
     
    });
    
    this.close.close()

  }

}
