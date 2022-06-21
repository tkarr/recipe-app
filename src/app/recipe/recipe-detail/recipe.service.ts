import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient';
import { Subject, Observable } from 'rxjs';

export class RecipeService {

    recipeSelected = new Subject<Recipe>();
    recipesSub = new Subject<Recipe[]>();
    private recipes: Recipe[] = 
    [new Recipe('Fried Rice', 'Fried Rice with veggies',
    'https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice.jpg', [new Ingredient('Rice', '1'), new Ingredient('Egg', '2') ], 1),
    new Recipe('Hummus', 'Garlic and lemon hummus', 'https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice.jpg', [new Ingredient('Chickpeas', '1'), new Ingredient('Tahini', '2') ], 2)];

    constructor() {
        console.log("recipe servicew created");
        this.recipesSub.next(this.recipes);
    }

    getRecipes() :Recipe[] {
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