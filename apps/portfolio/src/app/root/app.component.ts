import { Component, HostListener, OnInit, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../util/animations/animations';
import { fromEvent, Subject, zip, merge, Observable } from 'rxjs';
import { takeUntil, map, debounceTime } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'alessio-libardi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {
  wheel$ = fromEvent<WheelEvent>(this.document, 'wheel')
  wheelDirection$ = this.wheel$.pipe(map((wheel) => wheel.deltaY < 0 ? 'Up' : 'Down'))

  pointerDown$ = fromEvent<PointerEvent>(this.document, 'pointerdown')
  pointerMove$ = fromEvent<PointerEvent>(this.document, 'pointermove').pipe(debounceTime(250))
  pointerDirection$ = zip(this.pointerDown$, this.pointerMove$).pipe(map(([pointerDown, pointerMove]) => {
    return pointerDown.y < pointerMove.y ? 'Up' : 'Down'
  }))

  scrollDirection$: Observable<'Up' | 'Down'> = merge(this.wheelDirection$, this.pointerDirection$);

  unsubscribe$: Subject<void> =  new Subject();

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.pointerMove$.subscribe((event) => console.log(event))
    this.scrollDirection$.pipe(takeUntil(this.unsubscribe$)).subscribe((direction) => {
      if (direction === 'Up') {
        this.router.navigateByUrl('welcome')
      } else {
        this.router.navigateByUrl('about')
      }
    })
  }



  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
