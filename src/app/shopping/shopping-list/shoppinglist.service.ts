import { Ingredient } from '../../shared/ingredient';
import { Subject, Observable, Subscription, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';  
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Recipe } from 'src/app/recipe/recipe.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'    
  })
};

@Injectable()
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[];

    constructor(private http : HttpClient) {
      this.http.get<Ingredient[]>('https://localhost:7248/api/shopping-list').subscribe((data: Ingredient[]) => {
          this.ingredients = data;
      });
      this.ingredientsChanged.next(this.ingredients);
  }
  
    onIngredientAdded(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredients() {
      return this.ingredients.slice();
    }

    removeIngredient(name: string) {
      const filtered = this.ingredients.filter((ingredient: Ingredient) => {
        if (ingredient.name !== name) {
          return ingredient;
        }
      })

      this.ingredients = filtered;
      this.ingredientsChanged.next(filtered);
      
    }
}