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
  template: `
    <form class="day">
      <mat-label class="day-label"> {{ dayLabel }} </mat-label>
      @for (mealName of numberOfMeals | numSequence; track $index) {
      <ng-template
        *ngTemplateOutlet="meal; context: { $implicit: mealName }"
      ></ng-template>
      }
    </form>

    <ng-template #meal let-mealName>
      <mat-form-field class="meal-name">
        <mat-label>Meal {{ mealName }}</mat-label>
        <mat-select required>
          @for (recepie of recipies; track recepie.id) {
          <mat-option [value]="recepie.id">
            {{ recepie.name }}
          </mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field class="meal-amount">
        <mat-label>num</mat-label>
        <input
          type="number"
          min="0"
          [defaultValue]="0"
          required
          matInput
          matNativeControl
        />
      </mat-form-field>
    </ng-template>
  `,
  styles: [
    `
      .day {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }

      .day-label {
        flex-basis: 150px;
        min-width: 150px;
        display: flex;
        justify-content: center;
      }

      .meal-name {
        flex: 1 1;
        min-width: 200px;
      }

      .meal-amount {
        flex-basis: 75px;
        min-width: 75px;
      }
    `,
  ],
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
