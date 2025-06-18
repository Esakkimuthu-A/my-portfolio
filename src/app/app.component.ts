import { Component } from '@angular/core';
import { HttpRoutingService } from './shared/services/http-routing.service';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private HttpService : HttpRoutingService, private titleService: Title,private router:Router, private activatedRoute: ActivatedRoute ){
  }

  ngOnInit(): void{
    this.HttpService.getErrorMessages();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        this.titleService.setTitle(data['title'] || 'Portfolio');
      });
  }
}
