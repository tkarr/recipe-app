import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient';
import { Subject, Observable, Subscription, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';  
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'    
    })
  };

@Injectable()
export class RecipeService {
    recipeSelected = new Subject<Recipe>();
    recipesSub = new Subject<Recipe[]>();
    private recipes: Recipe[];

    constructor(private http : HttpClient) {
        this.http.get<Recipe[]>('https://localhost:7248/api/recipes').subscribe((data: Recipe[]) => {
            this.recipes = data;
        });
        this.recipesSub.next(this.recipes);
    }

    getRecipes() :Recipe[] {
        this.http.get<Recipe[]>('https://localhost:7248/api/recipes').subscribe((data: Recipe[]) => {
            this.recipes = data;
        });
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
        const recipe = this.recipes.find((r) => {
            return r.id === id;
        });
        return recipe;
    }

    addRecipe(recipe: Recipe) {
        const body = JSON.stringify(recipe);
        console.log(body);

        this.recipes.push(recipe);
        this.recipesSub.next(this.recipes);

        this.http.post('https://localhost:7248/api/recipes', body, httpOptions)
        .subscribe();
    }

    deleteRecipe(id: number) {
        var filtered = this.recipes.filter((recipe: Recipe) => {
            if (recipe.id !== id) {
                return recipe;
            };
        });

        this.recipes = filtered;
        this.recipesSub.next(this.recipes);
    }

    private extractData(res: any) {
        let body = res;
        return body;
    }

    private handleError(error: HttpErrorResponse) {
        console.error(error.message || error);
	    return throwError(error);
      }
}