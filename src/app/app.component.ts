import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'pulsifi-test';
  showNavbar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      const routeData = this.router.routerState.snapshot.root.firstChild?.data;
      if (routeData && routeData['hideNavbar'] === true) {
        this.showNavbar = false;
      } else {
        this.showNavbar = true;
      }
    });
  }
}
