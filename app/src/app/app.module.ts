import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material/material.module';

import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { SharedModule } from './shared/shared.module';
import { DataComponent } from './components/data/data.component';
import { InformationsComponent } from './components/informations/informations.component';
import { ApiComponent } from './components/api/api.component';
import { CitysComponent } from './components/citys/citys.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    InformationsComponent,
    ApiComponent,
    CitysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxJsonViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
