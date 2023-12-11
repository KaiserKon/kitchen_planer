import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Recipie, StoreService } from 'src/app/services/store.service';
import { NumSequencePipe } from '../../pipes/numSequenc.pipe';

@Component({
  selector: 'day',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NumSequencePipe,
  ],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css',
})
export class DayComponent implements OnDestroy {
  private store: StoreService = inject(StoreService);
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @Input() dayLabel = '';
  numberOfMeals = 0;

  recipies: Recipie[] = [];

  constructor() {
    this.store.numberOfMeals$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((num) => (this.numberOfMeals = num));

    this.store.recipies$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((recipies) => (this.recipies = recipies));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
