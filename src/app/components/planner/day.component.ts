import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
      <mat-label class="day-label"> {{ weekday }} </mat-label>
      <ng-container *ngFor="let mealName of numberOfMeals | numSequence">
        <ng-template
          *ngTemplateOutlet="meal; context: { $implicit: mealName }"
        ></ng-template>
      </ng-container>
    </form>

    <ng-template #meal let-mealName>
      <mat-form-field class="meal-name">
        <mat-label>Meal {{ mealName }}</mat-label>
        <mat-select required>
          <mat-option *ngFor="let recepie of foods" [value]="recepie.value">
            {{ recepie.name }}
          </mat-option>
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DayComponent {
  @Input() weekday = '';
  @Input() numberOfMeals = 0;

  foods: { value: string; name: string }[] = [
    { value: 'steak', name: 'Steak' },
    { value: 'pizza', name: 'Pizza' },
    { value: 'tacos', name: 'Tacos' },
  ];
}
