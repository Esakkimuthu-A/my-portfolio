import { Component } from '@angular/core';
import { educationContent,experienceContent } from '../../constants/portfolio.constant';

@Component({
  selector: 'app-my-journey',
  templateUrl: './my-journey.component.html',
  styleUrls: ['./my-journey.component.scss']
})
export class MyJourneyComponent {
  educationDetails = educationContent;
  experienceDetails =experienceContent;
}
