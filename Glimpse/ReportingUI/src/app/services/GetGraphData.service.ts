import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpParams} from '@angular/common/http';

@Injectable()
export class GetGraphDataService
{
    constructor(private httpclient:HttpClient)
    {

    }
    getData(spname:string):Observable<any>{
        let param1=new HttpParams().set('spname', spname);
        return this.httpclient.get("http://localhost:49189/api/graph",{params:param1});
    }

}