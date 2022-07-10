import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient';
import { Subject, Observable, Subscription, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';  
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class RecipeService {
    recipeSelected = new Subject<Recipe>();
    recipesSub = new Subject<Recipe[]>();
    private recipes: Recipe[];
    private apiUrl = 'https://localhost:7248/api';
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*'    
        })
      };

    constructor(private http : HttpClient) {
        this.http.get<Recipe[]>(this.apiUrl + '/recipes').subscribe((data: Recipe[]) => {
            this.recipes = data;
        });
        this.recipesSub.next(this.recipes);
    }

    //service calls return an observable
    //can be called in template using async pipe
    getRecipes(): Observable<Recipe> {
        return this.http
            .get<Recipe>(this.apiUrl + '/recipes')
            .pipe(retry(1), catchError(this.handleError));
    }

    getRecipe(id: number): Observable<Recipe> {
        return this.http
            .get<Recipe[]>(this.apiUrl + '/recipes/' + id)
            .pipe(retry(1), catchError(this.handleError));
    }

    addRecipe(recipe: Recipe): Observable<Recipe>{
        return this.http
            .post<Recipe>(this.apiUrl + '/recipes/', JSON.stringify(recipe), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    deleteRecipe(id: number) {
        var recipe = this.recipes.find((recipe: Recipe) => {
            if (recipe.id !== id) {
                return recipe;
            };
        });

        return this.http
            .delete<Recipe>(this.apiUrl + '/recipes/' + recipe.id, this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error(error.message || error);
	    return throwError(error);
      }
}