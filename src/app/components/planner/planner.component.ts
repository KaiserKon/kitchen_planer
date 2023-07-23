import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DayComponent } from './day/day.component';

@Component({
  selector: 'planner',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, DayComponent],
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
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
}
