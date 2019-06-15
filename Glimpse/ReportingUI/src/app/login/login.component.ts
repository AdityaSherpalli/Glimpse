import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  i:number;
  myIndex:number;
  slideIndex:number;
  length:number=5;
  interval:any;
  constructor(private router:Router) { }
  ngOnInit() {
    this.slideIndex = 1;
    this.myIndex=0;
    this.showDivs(this.slideIndex);
  }
  
  visible = false;
  Checkuser(e)
  {
    var username= e.target[0].value;
    var password=e.target[1].value;
    if(username=='admin'&&password=='admin')
    {
      clearInterval(this.interval);
      this.router.navigate(['filters']);
    }
    else
    {
      alert('invalid username/password');
    }
  }
  plusDivs(n) {
    this.showDivs(this.slideIndex += n);
    }
          
  showDivs(n) {
      let x = <HTMLElement[]><any> document.getElementsByClassName("mySlides");
      for (this.i = 0; this.i < x.length; (this.i)++) {
        x[this.i].style.display = "none";  
      }
      if(this.myIndex==null)
      {
        this.myIndex=n+1;
      }
      else
      {
        this.myIndex++;
      }
      if (this.myIndex > x.length) {this.myIndex = 1}    
      x[this.myIndex-1].style.display = "block";  
      this.interval= setInterval(this.showDivs,2000,this.myIndex);
    }
}
