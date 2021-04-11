import { Component, OnInit, Input } from '@angular/core';

import { IRestaurant } from "../models/restaurant"
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-resto-details',
  templateUrl: './resto-details.component.html',
  styleUrls: ['./resto-details.component.scss'],
})
export class RestoDetailsComponent implements OnInit {
  @Input() resto
  constructor(private storage: StorageService) { }

  ngOnInit() {}

}
