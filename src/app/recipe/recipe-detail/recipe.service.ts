import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient';
import { Subject, Observable, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';

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
        this.recipes.push(recipe);
        this.recipesSub.next(this.recipes);
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
}