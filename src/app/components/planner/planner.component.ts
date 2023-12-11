import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Moment } from 'moment';
import { ReplaySubject, takeUntil } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { DayComponent } from '../day/day.component';

@Component({
  selector: 'planner',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DayComponent,
  ],
  styleUrl: './planner.component.css',
  templateUrl: './planner.component.html',
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

    this.store.numberOfDays$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((a) => console.log(a));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onChange(event: any) {
    this.store.updateNumberOfMeals(Number(event.target.value));
  }

  onStartDateChange(date: Moment | null | undefined) {
    this.store.updateStartDate(date?.toDate() ?? new Date());
  }

  onEndDateChange(date: Moment | null | undefined) {
    this.store.updateEndDate(date?.toDate() ?? new Date());
  }
}
