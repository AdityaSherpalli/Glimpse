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
    document.getElementById("filters").style.color="black";
    document.getElementById("dashboard").style.color="black";
    document.getElementById("filters").style.backgroundColor="rgb(6,96,44)";
  }
  changecolorRepo()
  {
      document.getElementById("filters").style.color="black";
      document.getElementById("dashboard").style.color="white";
      document.getElementById("dashboard").style.backgroundColor=" rgb(79, 185, 74)";
      document.getElementById("filters").style.backgroundColor="rgb(6,96,44)";
      this.router.navigate(['filters']);
  }
  changecolorDash()
  {
      document.getElementById("filters").style.color="white";
      document.getElementById("dashboard").style.color="black";
      document.getElementById("filters").style.backgroundColor=" rgb(79, 185, 74)";
      document.getElementById("dashboard").style.backgroundColor="rgb(6,96,44)";
      this.router.navigate(['dashboard']);
  }
}

