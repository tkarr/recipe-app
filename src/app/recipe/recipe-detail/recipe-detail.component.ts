import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { RecipeService } from './recipe.service';
import { ShoppingListService } from '../../shopping/shopping-list/shoppinglist.service';
import { Ingredient } from '../../shared/ingredient';
import { ActivatedRoute, Router, Data } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  constructor(private shoppingListService :ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.recipe = data['recipe'];
      }
    )
  }

  toShoppingList() {
    for (let i of this.recipe.ingredients) {
      this.shoppingListService.onIngredientAdded(i);
    }
    
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.recipe = null;
    this.router.navigate(["../../"]);
    }

}
