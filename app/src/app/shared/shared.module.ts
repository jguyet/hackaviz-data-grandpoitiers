import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { DatavizService } from './services/dataviz.service';
import { ChartvizComponent } from './components/chartviz/chartviz.component';

@NgModule({
  declarations: [ChartvizComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot({
        resourceServer: {
            sendAccessToken: true
        }
    })
  ],
  exports: [ChartvizComponent],
  providers: [DatavizService]
})
export class SharedModule { }
