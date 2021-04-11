import { Component, OnInit } from '@angular/core';

import { IRestaurant } from "../models/restaurant"
import { StorageService } from '../storage/storage.service';
@Component({
  selector: 'app-resto-details',
  templateUrl: './resto-details.component.html',
  styleUrls: ['./resto-details.component.scss'],
})
export class RestoDetailsComponent implements OnInit {

  constructor(private storage: StorageService) { }

  ngOnInit() {}

}
