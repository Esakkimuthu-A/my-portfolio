import { Component } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import * as $ from 'jquery';
import { contactAddress } from '../../constants/portfolio.constant';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],

})
export class DashboardPageComponent {

  contactDetails = contactAddress;
  
  constructor(public commonService: CommonService){}
  
  ngOnInit(){
    this.initialAnimation();
  }

  initialAnimation(){
    const text=document.querySelector(".animate-text");
    if(text){
      const textLoad = ()=>{
        setTimeout(() => {
          text.textContent="Angular Developer"
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

  ngAfterViewInit(): void {
    const chatbox = $.noConflict();

    chatbox(() => {
      chatbox('.chatbox-open').on('click', function () {
        chatbox('.chatbox-popup, .chatbox-close').fadeIn();
      });

      chatbox('.chatbox-close').on('click', function () {
        chatbox('.chatbox-popup, .chatbox-close').fadeOut();
      });

      chatbox('.chatbox-maximize').on('click', function () {
        chatbox('.chatbox-popup, .chatbox-open, .chatbox-close').fadeOut();
        chatbox('.chatbox-panel').fadeIn(function () {
          chatbox(this).css({ display: 'flex' });
        });
      });

      chatbox('.chatbox-minimize').on('click', function () {
        chatbox('.chatbox-panel').fadeOut();
        chatbox('.chatbox-popup, .chatbox-open, .chatbox-close').fadeIn();
      });

      chatbox('.chatbox-panel-close').on('click', function () {
        chatbox('.chatbox-panel').fadeOut();
        chatbox('.chatbox-open').fadeIn();
      });
    });
  }


  downloadCV(){
    const resumeUrl='/assets/ESAKKIMUTHU.pdf';
    const link=document.createElement('a');
    link.href=resumeUrl;
    link.download='Esakkimuthu_resume.pdf';
    link.click();
    link.remove();
  }
  

  sendMessage(){
    console.log("send message");
  }

}
