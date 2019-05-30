import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpParams} from '@angular/common/http';

@Injectable()
export class PopulateDDLDataService
{
    constructor(private httpclient:HttpClient)
    {

    }
    getData(spName:string):Observable<any>{
        let param1=new HttpParams().set('SpName',spName);
        return this.httpclient.get("http://localhost:49189/api/PopulateDDL",{params:param1});
    }

}