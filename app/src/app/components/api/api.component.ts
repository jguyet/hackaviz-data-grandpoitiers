import { Component, OnInit } from '@angular/core';
import { DatavizService } from 'src/app/shared/services/dataviz.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpEventType } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

    public apiEndpoint: string = environment.dataApi;

    public q: string = "zones=\"POITIERS Gare\"";

    /** type = progress | complete | unknown | error */
    public response: any = { type: '', status: '', progress: 0, message: '', content: '', error: '' };

    private subscriptions: Subscription = new Subscription();

    constructor(public datavizService: DatavizService) { }

    ngOnInit() {
        this.onChange();
    }

    onChange() {
        this.response = { type: '', status: '', progress: 0, message: '', content: '', error: '' };
        this.subscriptions.add(this.datavizService.getPredictionQueryParams(`q=${this.q}`)
            .pipe(filter(x =>
                x.type === HttpEventType.Response ||
                x.type === null && x.status === 'error' ||
                x.type === HttpEventType.UploadProgress ||
                x.type === HttpEventType.DownloadProgress))
            .subscribe(
                (res) => {
                    console.log(res);
                    this.response = res;
                }
            ));
    }

    getURI() {
        return this.datavizService.getPredictionQueryParamsURI(`q=${this.q}`);
    }

}
