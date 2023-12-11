import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
      this.recipiesSubject.value.filter((recipie) => recipie.id !== id)
    );
  }
}
