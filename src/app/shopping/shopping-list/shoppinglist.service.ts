import { Ingredient } from '../../shared/ingredient';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [new Ingredient('Bagels', '1'), new Ingredient('beer', '16')];

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