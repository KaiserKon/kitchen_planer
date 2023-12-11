import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PlannerComponent } from 'src/app/components/planner/planner.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, MatTabsModule, PlannerComponent],
  template: `
    <mat-tab-group dynamicHeight>
      <mat-tab label="Planner">
        <ng-template matTabContent>
          <planner></planner>
        </ng-template>
      </mat-tab>
      <mat-tab label="Ingredients"></mat-tab>
      <mat-tab label="Recipies"></mat-tab>
    </mat-tab-group>
  `,
})
export class HomeComponent {}
