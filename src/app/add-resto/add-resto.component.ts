import { Component, OnInit } from '@angular/core';


import { IRestaurant } from "../models/restaurant"
import { StorageService } from '../storage/storage.service';
@Component({
  selector: 'app-add-resto',
  templateUrl: './add-resto.component.html',
  styleUrls: ['./add-resto.component.scss'],
})
export class AddRestoComponent implements OnInit {

  constructor(private storage: StorageService) { }

  ngOnInit() {}

}
