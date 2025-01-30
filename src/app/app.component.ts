import { Component } from '@angular/core';
import { HttpRoutingService } from './shared/services/http-routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private HttpService : HttpRoutingService ){
  }

  ngOnInit(): void{
    this.HttpService.getErrorMessages();
  }
}
