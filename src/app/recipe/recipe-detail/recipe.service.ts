import { Recipe } from '../recipe.model';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';  
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
    getRecipes(): Observable<Recipe | Recipe[]> {
        return this.http
            .get<Recipe>(this.apiUrl + '/recipes')
            .pipe(retry(1), catchError(this.handleError));
    }

    getRecipe(id: number): Observable<Recipe> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("id", id);


        return this.http
            .get<Recipe>(this.apiUrl + '/recipes/', {params:queryParams})
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

    deleteRecipe(id: number): Observable<Recipe> {
        var recipe = this.recipes.find((recipe: Recipe) => {
            if (recipe.id !== id) {
                return recipe;
            };
        });
        console.log("Recipe to delete: ", recipe);

        let queryParams = new HttpParams();
        queryParams = queryParams.append("id", id);

        return this.http
            .delete<Recipe>(this.apiUrl + '/recipes/', {params:queryParams, headers:this.httpOptions.headers})
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error(error.message || error);
        window.alert(error.message);
	    return throwError(error);
      }
}