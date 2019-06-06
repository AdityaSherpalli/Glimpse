import { Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  constructor(private router:Router)
  {
    
  }
  ngOnInit()
  {
    if(this.router.url=='/filters')
    {
      document.getElementById("filters").style.color="black";
      document.getElementById("dashboard").style.color="white";
    }
    if(this.router.url=='/dashboard')
    {
      document.getElementById("filters").style.color="white";
      document.getElementById("dashboard").style.color="black";
    }
  }
  changecolor()
  {
    if(this.router.url=='/filters')
    {
      document.getElementById("filters").style.color="white";
      document.getElementById("dashboard").style.color="black";
    }
    if(this.router.url=='/dashboard')
    {
      document.getElementById("filters").style.color="black";
      document.getElementById("dashboard").style.color="white";
    }
  }
}
