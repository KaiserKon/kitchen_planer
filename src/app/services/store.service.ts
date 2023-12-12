import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
} from 'rxjs';

export interface Recipie {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class StoreService {
  private numberOfMealsSubject = new BehaviorSubject(3);

  numberOfMeals$ = this.numberOfMealsSubject.asObservable();

  updateNumberOfMeals(nextNumber: number) {
    this.numberOfMealsSubject.next(nextNumber);
  }

  // ----------------------------------------------------------------------

  private recipiesSubject: BehaviorSubject<Recipie[]> = new BehaviorSubject([
    { id: 'steak', name: 'Steak' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'tacos', name: 'Tacos' },
  ]);

  recipies$ = this.recipiesSubject.asObservable();

  addRecipie(recepie: Recipie) {
    this.recipiesSubject.next([...this.recipiesSubject.value, recepie]);
  }

  removeRecipie(id: string) {
    this.recipiesSubject.next(
      this.recipiesSubject.value.filter((recipie) => recipie.id !== id),
    );
  }

  // ----------------------------------------------------------------------

  private startDateSubject: BehaviorSubject<Date | null> =
    new BehaviorSubject<Date | null>(null);
  private endDateSubject: BehaviorSubject<Date | null> =
    new BehaviorSubject<Date | null>(null);

  startDate$ = this.startDateSubject.asObservable();
  endDate$ = this.endDateSubject.asObservable();

  orderedDayNamesForRange$ = combineLatest([
    this.startDate$,
    this.endDate$,
  ]).pipe(
    debounceTime(20),
    filter((input): input is [Date, Date] => input.every((entry) => !!entry)),
    map(([startDate, endDate]) => {
      let daysArray = [];
      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        daysArray.push(
          d.toLocaleDateString('de-DE', {
            weekday: 'short',
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          }),
        );
      }
      return daysArray;
    }),
  );

  updateStartDate(date: Date | null) {
    this.startDateSubject.next(date);
  }

  updateEndDate(date: Date | null) {
    this.endDateSubject.next(date);
  }
}
