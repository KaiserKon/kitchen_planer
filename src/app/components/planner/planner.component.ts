import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DayComponent } from './day.component';

@Component({
  selector: 'planner',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, DayComponent],
  template: `
    <!-- TODO Config Area for Timeframe and number of meals per day. -->
    <mat-form-field>
      <input
        type="number"
        min="1"
        [defaultValue]="numberOfMeals"
        matInput
        matNativeControl
        (change)="onChange($event)"
      />
    </mat-form-field>

    <div class="day-body">
      @for (weekday of weekdays; track $index) {
      <day [weekday]="weekday" [numberOfMeals]="numberOfMeals"></day>
      }
    </div>
  `,
  styles: [
    `
      .day-body {
        width: 100%;
        overflow-x: auto;
      }
    `,
  ],
})
export class PlannerComponent {
  weekdays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  numberOfMeals = 3;

  onChange(event: any) {
    this.numberOfMeals = Number(event.target.value);
  }
}
