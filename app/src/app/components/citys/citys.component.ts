import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DatavizService } from 'src/app/shared/services/dataviz.service';
import { HttpEventType } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-citys',
  templateUrl: './citys.component.html',
  styleUrls: ['./citys.component.css']
})
export class CitysComponent implements OnInit, OnDestroy {

    /** type = progress | complete | unknown | error */
    public response: any = { type: '', status: '', progress: 0, message: '', content: '', error: '' };

    private subscriptions: Subscription = new Subscription();

    constructor(public datavizService: DatavizService) { }

    ngOnInit() {
        this.subscriptions.add(this.datavizService.getZones()
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

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

}
