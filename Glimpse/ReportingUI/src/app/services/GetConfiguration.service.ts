import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpParams} from '@angular/common/http';

@Injectable()
export class GetConfigurationService
{
    constructor(private httpclient:HttpClient)
    {

    }
    getData(reportname:string):Observable<any>{
        let param1=new HttpParams().set('ReportName',reportname);
        return this.httpclient.get("http://localhost:49189/api/UIConfiguration",{params:param1});
    }

}