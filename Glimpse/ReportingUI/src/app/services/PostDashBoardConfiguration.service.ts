import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable()
export class PostDashBoardConfiguration
{
    constructor(private httpclient:HttpClient)
    {

    }
    getData():Observable<any>
    {
        return this.httpclient.get("http://localhost:49189/api/Dashboard");
    }
    putData(configuration:any):Observable<any>{
        return this.httpclient.post("http://localhost:49189/api/Dashboard",configuration,
        {
            headers:new HttpHeaders({
                'Content-Type':'application/json'
            })
        });
    }

}