import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

import * as CanvasJS from '../../../../assets/js/canvasjs.min';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-chartviz',
  templateUrl: './chartviz.component.html',
  styleUrls: ['./chartviz.component.css']
})
export class ChartvizComponent implements OnInit, AfterViewInit {

    @Input("data") data: Observable<any>;
    @Input("type") type: string 

    @ViewChild("divChartViz", { static: false }) div: ElementRef;

    private chart: any;
    private charId: string;

    private linkData: any = [];

    constructor() {
    }

    ngOnInit() {
        this.charId = "chartContainer" + Math.ceil(Math.random() * 1000);
    }

    ngAfterViewInit() {
        this.div.nativeElement.id = this.charId;
        var t = {};

        switch (this.type) {
            case "pie":
                t = {
                    type: "pie",
                    indexLabelFontSize: 15,
                    radius: 90,
                    indexLabel: "{label} - {y}",
                    yValueFormatString: "###0.0\" Mwh\"",
                    dataPoints: this.linkData
                };
                break;
            case "column":
                    t = {
                        type: "column",
                        yValueFormatString: "###0.0\" Mwh\"",
                        dataPoints: this.linkData
                    };
                break ;
            default:
                t = {
                    type: "line",
                    yValueFormatString: "###0.0\" Mwh\"",
                    dataPoints: this.linkData
                };
                break;
        }
        this.chart = new CanvasJS.Chart(this.charId, {
            animationEnabled: false,
            exportEnabled: false,
            theme: "light1", // "light1", "light2", "dark1", "dark2"
            title: {
                text: ""
            },
            data: [t]
        });
        this.data.subscribe((x) => {
            while(this.linkData.length > 0) {
                this.linkData.shift();
            }
            for (let i = 0; i < x.length; i++) {
                this.linkData.push(x[i]);
            }
            this.chart.render();
        });
    }

}
