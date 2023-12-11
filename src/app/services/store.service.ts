import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';

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

  private startDateSubject = new BehaviorSubject(new Date());
  private endDateSubject = new BehaviorSubject(new Date());

  startDate$ = this.startDateSubject.asObservable();
  endDate$ = this.endDateSubject.asObservable();

  numberOfDays$ = combineLatest([
    this.startDateSubject.asObservable(),
    this.endDateSubject.asObservable(),
  ]).pipe(
    tap(([startDate, endDate]) =>
      console.log(`start: ${startDate} | end: ${endDate}`),
    ),
    map(([startDate, endDate]) => endDate.valueOf() - startDate.valueOf()),
    map((diff) => Math.ceil(diff / (1000 * 3600 * 24) + 1)),
    map((days) => Math.max(days, 1)),
  );

  updateStartDate(date: Date) {
    this.startDateSubject.next(date);
  }

  updateEndDate(date: Date) {
    this.endDateSubject.next(date);
  }
}
