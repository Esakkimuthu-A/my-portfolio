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

  ngOnInit() {
    this.getParamValue();
    this.getRouteValue();
    this.theme = new FormControl(true)
    this.theme.patchValue(this.commonService.getTheme() == 'dark');
    this.checkTheme();
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
}
