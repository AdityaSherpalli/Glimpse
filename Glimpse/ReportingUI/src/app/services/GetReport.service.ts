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
    
    getData(Spname: string, parameters: Map<string, string>): Observable<any>{
        for(let [key,value] of Array.from(parameters.entries()))
        {
            console.log(key,value);
        }
        let param1=new HttpParams().set('spName', Spname).set('parameterPair', parameters);
        return this.httpclient.get(this.url,{params:param1});
    }
}