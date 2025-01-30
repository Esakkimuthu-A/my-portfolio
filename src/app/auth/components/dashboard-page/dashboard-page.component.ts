import { Component } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],

})
export class DashboardPageComponent {

  constructor(public commonService: CommonService){}
  
  ngOnInit(){
    this.initialAnimation();
  }

  initialAnimation(){
    const text=document.querySelector(".animate-text");
    if(text){
      const textLoad = ()=>{
        setTimeout(() => {
          text.textContent="Full Stack Developer"
        },0);
        setTimeout(() => {
          text.textContent="Web Designer"
        },4000);
        setTimeout(() => {
          text.textContent="Youtuber"
        },8000);
      }
      textLoad();
      setInterval(textLoad,12000);
    }
  }

  downloadCV(){
    const resumeUrl='/assets/Document.pdf';
    const link=document.createElement('a');
    link.href=resumeUrl;
    link.download='My_Resume.pdf';
    link.click();
    link.remove();
  }

}
