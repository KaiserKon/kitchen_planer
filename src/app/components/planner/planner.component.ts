import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReplaySubject, takeUntil } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { DayComponent } from './day.component';

@Component({
  selector: 'planner',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, DayComponent],
  template: `
    <!-- TODO Config Area for Timeframe and number of meals per day. -->
    <mat-form-field>
      <mat-label>Number of meals per day</mat-label>
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
      <day [dayLabel]="weekday"></day>
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
export class PlannerComponent implements OnDestroy {
  private store: StoreService = inject(StoreService);
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  weekdays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  numberOfMeals = 0;

  constructor() {
    this.store.numberOfMeals$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((num) => (this.numberOfMeals = num));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onChange(event: any) {
    this.store.updateNumberOfMeals(Number(event.target.value));
  }
}
