import { Component, Renderer2 } from '@angular/core';
import { PageNavigation } from '../../constants/portfolio.constant';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router, private commonService: CommonService, private renderer: Renderer2) { }

  mapping: { [key: string]: number } = {
    dashboard: 0,
    aboutus: 1,
    contactus: 2,
  };
  navigationDetails = PageNavigation;
  hoverIndex = 0;
  fullUrl !: string[];
  theme !: FormControl;



  animatedElements = new Set();
  defaultAnimations: any = {
    fadeIn: [
      { opacity: 0, offset: 0 },
      { opacity: 1, offset: 1 }
    ],
    fadeOut: [
      { opacity: 1, offset: 0 },
      { opacity: 0, offset: 1 }
    ],
    slideITopFade:[
      { opacity: 0, transform: "translateY(20px)", offset: 0 },
      { opacity: 1, transform: "translateY(0px)", offset: 1}
    ],
    slideInLeftFade: [
      { opacity: 0, transform: "translateX(100px)", offset: 0 },
      { opacity: 1, transform: "translateX(0)", offset: 1 }
    ],
    slideInRightFade: [
      { opacity: 0, transform: "translateX(-100px)", offset: 0 },
      { opacity: 1, transform: "translateX(0)", offset: 1 }
    ],
    slideOutLeftFade: [
      { opacity: 1, transform: "translateX(0)", offset: 0 },
      { opacity: 0, transform: "translateX(-100%)", offset: 1 }
    ],
    slideInTopFade: [
      { opacity: 0, transform: "translateY(100%)", offset: 0 },
      { opacity: 1, transform: "translateY(0)", offset: 1 }
    ],
    slideOutTopFade: [
      { opacity: 1, transform: "translateY(0)", offset: 0 },
      { opacity: 0, transform: "translateY(-100%)", offset: 1 }
    ],
    topLeftInOut: [
      { opacity: 0, transform: 'rotateZ(90deg)', transformOrigin: 'top left', offset: 0 },
      { opacity: 0.66, transform: 'rotateZ(-10deg)', transformOrigin: 'top left', offset: 0.66 },
      { opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'top left', offset: 0.95 },
      { opacity: 1, transform: 'rotateZ(0deg)', transformOrigin: 'top left', offset: 1 }
    ],
    bottomRightInOut: [
      { opacity: 0, transform: "rotateZ(90deg)", transformOrigin: "bottom right", offset: 0 },
      { opacity: 0.66, transform: "rotateZ(-10deg)", transformOrigin: "bottom right", offset: 0.66 },
      { opacity: 1, transform: "rotateZ(0deg)", transformOrigin: "bottom right", offset: 1 },
    ],
    gelatine: [
      { transform: "scale(1, 1)", offset: 0 },
      { transform: "scale(0.9, 1.1)", offset: 0.25 },
      { transform: "scale(1.1, 0.9)", offset: 0.5 },
      { transform: "scale(0.95, 1.05)", offset: 0.75 },
      { transform: "scale(1, 1)", offset: 1 },
    ],
    backDrop: [
      { opacity: 0, transform: "translateX(-12.5px) translateY(-12.5px) scale(0.7, 0.7)", offset: 0 },
      { opacity: 1, transform: "translateX(-12.5px) translateY(-12.5px) scale(1, 1)", offset: 0.5 },
      { opacity: 1, transform: "translateX(5px) translateY(5px) scale(1, 1)", offset: 0.75 },
      { opacity: 1, transform: "translateX(0) translateY(0) scale(1, 1)", offset: 1 },
    ],
    pulse: [
      { transform: "scale(1)", offset: 0 },
      { transform: "scale(1.1)", offset: 0.5 },
      { transform: "scale(1)", offset: 1 },
    ],
  };

  ngOnInit() {
    this.getParamValue();
    this.getRouteValue();
    this.theme = new FormControl(true)
    this.theme.patchValue(this.commonService.getTheme() == 'dark');
    this.checkTheme();
  }

  ngAfterViewInit() {
    this.IntersectionObserver();
  }

  getRouteValue() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getParamValue();
    });
  }

  getParamValue() {
    const currentUrl = this.router.url;
    this.fullUrl = currentUrl.split('/').filter(part => part);
    this.hoverIndex = this.mapping[this.fullUrl[1]];
  }

  onNavigate() {
    this.getParamValue();
  }

  closeMenu() {
    var sideMenu = document.getElementById('sideMenu');
    var dropMenu = document.getElementById('dropMenu');
    if (sideMenu) {
      sideMenu.style.right = "-300px";
    }
    if (dropMenu) {
      dropMenu.style.width = "0vw"
    }
  }

  checkTheme() {
    if (this.theme?.value) {
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
    }
    this.commonService.setTheme(this.theme?.value);
  }

  changeTheme() {
    this.checkTheme();
  }

  openMenu() {
    var sideMenu = document.getElementById('sideMenu');
    var dropMenu = document.getElementById('dropMenu');
    if (sideMenu) {
      sideMenu.style.right = "0px";
    }
    if (dropMenu) {
      dropMenu.style.width = "100vw"
    }
  }

  IntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const animationName = el.getAttribute("data-animation-name") || "slideInLeftFade";
        const animateType = el.getAttribute("data-animation");
        const animationTime =Number(el.getAttribute("data-animation-time")) || 700
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
