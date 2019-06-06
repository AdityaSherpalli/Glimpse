import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class GetReport
{
    dat:any;
    keyss:any;
    constructor(private httpclient: HttpClient) { }
    url:string = "http://localhost:49189/api/report";
    
    getData(Spname: string, parameters: {}): Observable<any>{
        let param1=new HttpParams().set('spName', Spname).set('parameter',JSON.stringify(parameters));
        return this.httpclient.get(this.url,{params:param1});
    }
}