import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { RestoDetailsComponent } from '../resto-details/resto-details.component';
import { AddRestoComponent } from '../add-resto/add-resto.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { HomePageRoutingModule } from './home-routing.module';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    NgbPaginationModule
    
  ],
  declarations: [HomePage, RestoDetailsComponent, AddRestoComponent,
    AboutUsComponent]
})
export class HomePageModule {}
