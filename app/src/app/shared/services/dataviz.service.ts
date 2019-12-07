import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatavizService {

    private endpoint: string = environment.dataApi;

    constructor(private httpClient: HttpClient) {  }

    public getZones(): Observable<any> {
        return this.parse(this.httpClient.get<string[]>(`${this.endpoint}/search_query?q=distinct="zones"`, {
            reportProgress: true,
            observe: 'events'
          })); 
    }

    public getPrediction(zone: string): Observable<any> {
        return this.parse(this.httpClient.get<any>(`${this.endpoint}/predict_query?q=zones="${zone}"`, {
            reportProgress: true,
            observe: 'events'
          })); 
    }

    public getPredictionQueryParams(params: string): Observable<any> {
        return this.parse(this.httpClient.get<any>(`${this.endpoint}/predict_query?${params}`, {
            reportProgress: true,
            observe: 'events'
          })); 
    }

    public getPredictionQueryParamsURI(params: string) {
        return `${this.endpoint}/predict_query?${params}`;
    }

    private parse(result: Observable<any>): Observable<{ type: any, status: string, progress?: number, message?: string, content?: string, error?: any; }> {
        return result.pipe(
            catchError((err) => {
                console.log(err);
                return ([{ type: null, status: 'error', message: err.error ? err.error.error ? err.error.error.message : undefined : undefined, error: err }]);
            }),
            map((event: any) => {
                switch (event.type) {
                    case HttpEventType.DownloadProgress:
                    var progress = Math.round(100 * event.loaded / event.total);
                    return { type: event.type, status: 'progress', progress: progress };
                    case HttpEventType.UploadProgress:
                    var progress = Math.round(100 * event.loaded / event.total);
                    return { type: event.type, status: 'progress', progress: progress };
                    case HttpEventType.Response:
                    return { type: event.type, status: 'complete', content: event.body };
                    default:
                    return { type: event.type, status: event.status ? event.status : 'unknown', message: event.message, error: event.error };
                }
            })
        );
    }
}
