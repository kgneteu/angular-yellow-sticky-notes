import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-back-title',
  templateUrl: './back-title.component.html',
  styleUrls: ['./back-title.component.scss'],
  animations: [
    trigger('titleBoxSize', [
      state('open', style({
        height: '100vh',
        fontSize: '10vw',
        lineHeight: '12vw',
      })),
      state('normal', style({
        height: '3rem',
        fontSize: '2rem',
        lineHeight: '3rem',
        width: '15rem',
        marginLeft: '4rem',
      })),
      transition('open => normal', animate(700)),
    ]),
  ],
})
export class BackTitleComponent implements OnInit {
  aniState = 'open';

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => this.aniState = 'normal', 1000);
  }

}
