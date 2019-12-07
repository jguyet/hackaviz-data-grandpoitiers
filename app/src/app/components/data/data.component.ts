import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { DatavizService } from 'src/app/shared/services/dataviz.service';
import { RouterStateSnapshot, RouterLink, Router, Route, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';

import * as CanvasJS from '../../../assets/js/canvasjs.min';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, OnDestroy {

    /********** PUBLIC **********/

    /** current city url parameter */
    public city: string;
    /** final years tabs */
    public yearsTab: number[] = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    public year: number = 2019;
    public cols: number;
    /** type = progress | complete | unknown | error */
    public response: any = { type: '', status: '', progress: 0, message: '', content: '', error: '' };

    /********** PRIVATE **********/
    private data: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    /** subscriptions of observables */
    private subscriptions: Subscription = new Subscription();

    constructor(public datavizService: DatavizService, public route: ActivatedRoute) {
        this.city = this.route.snapshot.params.city;
        this.cols = (window.innerWidth <= 460) ? 1 : 3;
    }

    ngOnInit() {
        this.subscriptions.add(this.datavizService.getPrediction(this.city)
            .pipe(filter(x =>
                x.type === HttpEventType.Response ||
                x.type === null && x.status === 'error' ||
                x.type === HttpEventType.UploadProgress ||
                x.type === HttpEventType.DownloadProgress))
            .subscribe(
                (res) => {
                    this.response = res;
                    if (res.type === HttpEventType.Response) {
                        this.render(this.year);
                    }
                }
            ));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode == 37 && this.year > 2013) {
            this.year -= 1;
            this.render(this.year);
        } else if (event.keyCode == 39 && this.year < 2030) {
            this.year += 1;
            this.render(this.year);
        }
    }

    onResize(event) {
        this.cols = (event.target.innerWidth <= 460) ? 1 : 3;
    }

    onTabClick(event) {
        this.year = 2013 + event.index;
        this.render(this.year);
    }

    render(year) {
        let d = [];
        const keys = Object.keys(this.response.content);
        for (var o = 0; o < keys.length; o++) {
            const value = this.response.content[keys[o]];
            d.push({ y: this.format(value, year - 2013), label: keys[o] });
        }

        this.data.next(d);
    }

    format(obj: { bilan_conso_energie_finale_mwh: number, objectif_bilan_conso_energie_finale_mwh: number }, current_step: number, max_step: number = 17): number {
        const objectif_without_current = (obj.objectif_bilan_conso_energie_finale_mwh - obj.bilan_conso_energie_finale_mwh);

        return Number(parseFloat((obj.bilan_conso_energie_finale_mwh + (current_step * (objectif_without_current) / max_step)) + '').toFixed(2));
    }


    aug(obj: { bilan_conso_energie_finale_mwh: number, objectif_bilan_conso_energie_finale_mwh: number }, current_step: number, on = "start"): string {
        const start     = obj.bilan_conso_energie_finale_mwh;
        const objectif  = obj.objectif_bilan_conso_energie_finale_mwh;
        const percentOn = (on == 'start') ? start : (objectif - start);
        const current   = (on == 'start') ? this.format(obj, current_step) : this.format(obj, current_step) - start;
        const percent   = Math.round(((((current) * 100) / (percentOn)) - (percentOn == start ? 100 : 0)));

        if (percent == Infinity || Number.isNaN(percent)) return '0%';
        return (percent >= 0) ? ('+' + percent + '%') : (percent + '%');
    }

}
