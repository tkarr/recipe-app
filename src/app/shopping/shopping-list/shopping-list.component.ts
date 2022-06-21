import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient';
import { ShoppingListEditComponent } from './../shopping-list-edit/shopping-list-edit.component';
import { ShoppingListService } from './shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients :Ingredient[];
  isShoppingListEditDisplayed = false;
  ingredientsToRemove = [];
  private ifChangedSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { 
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ifChangedSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  ngOnDestroy() {
    this.ifChangedSub.unsubscribe();
  }


  onIngredientAdded(ingredient: Ingredient) {
    this.shoppingListService.onIngredientAdded(ingredient);
  }

  deleteIngredient(ingredient: Ingredient): void {
    this.shoppingListService.removeIngredient(ingredient.name);
  }
}
