import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
export interface Section {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-dash-coperativa',
  templateUrl: './dash-coperativa.component.html',
  styleUrls: ['./dash-coperativa.component.css']
})
export class DashCoperativaComponent {
  
  folders: Section[] = [
    {icon: 'person', name: 'Associados'},
    {icon: 'opacity', name: 'Coletas'},
    {icon: 'label', name: 'Medições',}
  ];

  notes: Section[] = [
    {icon: 'label', name: 'Vacation Itinerary'},
    {icon: 'label', name: 'Kitchen Remodel'}
  ];
  
  /** Based on the screen size, switch from standard to one column per row */
   
  
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
