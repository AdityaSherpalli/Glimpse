import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  visible = false;
  Checkuser(e)
  {
    var username= e.target[0].value;
    var password=e.target[1].value;
    if(username=='admin'&&password=='admin')
    {
      this.router.navigate(['header']);
    }
    else
    {
      alert('invalid username/password');
    }
  }
}
