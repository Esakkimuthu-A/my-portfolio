import { Component } from '@angular/core';
import { educationContent, experienceContent } from '../../constants/portfolio.constant';

@Component({
  selector: 'app-my-journey',
  templateUrl: './my-journey.component.html',
  styleUrls: ['./my-journey.component.scss']
})
export class MyJourneyComponent {

  animatedElements = new Set();
  defaultAnimations: any = {
    slideITopFade: [
      { opacity: 0, transform: "translateY(20px)", offset: 0 },
      { opacity: 1, transform: "translateY(0px)", offset: 1 }
    ],
    slideInLeftFade: [
      { opacity: 0, transform: "translateX(100px)", offset: 0 },
      { opacity: 1, transform: "translateX(0)", offset: 1 }
    ],
    slideInRightFade: [
      { opacity: 0, transform: "translateX(-100px)", offset: 0 },
      { opacity: 1, transform: "translateX(0)", offset: 1 }
    ]
  };
  
  educationDetails = educationContent;
  experienceDetails = experienceContent;

  ngAfterViewInit() {
    this.IntersectionObserver();
  }

  IntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const animationName = el.getAttribute("data-animation-name") || "slideInLeftFade";
        const animateType = el.getAttribute("data-animation");
        const animationTime = Number(el.getAttribute("data-animation-time")) || 700
        if (entry.isIntersecting) {
          this.animateElement(el, this.defaultAnimations[animationName], animationTime, "normal", 0);
          this.animatedElements.add(el);
        } else {
          this.animateElement(el, this.defaultAnimations[animationName], animationTime, "reverse");
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll("[data-animation='in'],[data-animation='in-out'],[data-animation='in-once']").forEach(el => {
      observer.observe(el);
    });
  }

  animateElement(elem: Element, animation: any, time: number, direction?: PlaybackDirection, delay = 0) {
    return elem.animate(animation, {
      delay,
      duration: time,
      direction,
      easing: "ease-out",
      iterations: 1,
      fill: "forwards"
    });
  };
}
