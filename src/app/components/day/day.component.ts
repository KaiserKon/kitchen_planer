import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StoreService } from 'src/app/services/store.service';
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
export class DayComponent {
  private store: StoreService = inject(StoreService);

  @Input() dayLabel = '';

  numberOfMeals$ = this.store.numberOfMeals$;
  recipies$ = this.store.recipies$;
}
