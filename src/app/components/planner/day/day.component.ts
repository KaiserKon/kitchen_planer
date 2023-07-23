import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NumSequencePipe } from '../../../pipes/numSequenc.pipe';

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
  styleUrls: ['./day.component.css'],
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
