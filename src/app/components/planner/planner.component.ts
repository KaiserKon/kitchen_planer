import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { first, ReplaySubject, takeUntil } from 'rxjs';
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
    ReactiveFormsModule,
  ],
  styleUrl: './planner.component.css',
  templateUrl: './planner.component.html',
})
export class PlannerComponent implements OnDestroy {
  private store: StoreService = inject(StoreService);
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  weekdays$ = this.store.orderedDayNamesForRange$;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor() {
    this.store.startDate$
      .pipe(first())
      .subscribe((date) => this.range.controls.start.setValue(date));

    this.store.endDate$
      .pipe(first())
      .subscribe((date) => this.range.controls.end.setValue(date));

    this.range.controls.start.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((date) => this.onStartDateChange(date));

    this.range.controls.end.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((date) => this.onEndDateChange(date));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onStartDateChange(date: Date | null) {
    this.store.updateStartDate(date);
  }

  onEndDateChange(date: Date | null) {
    this.store.updateEndDate(date);
  }
}
