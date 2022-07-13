import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RecipeService } from '../recipe/recipe-detail/recipe.service';
import { Recipe } from '../recipe/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() shoppingListToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  recipes: Recipe[];
  filteredRecipes: Recipe[];


  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes()
                      .subscribe((serviceRecipes: Recipe[]) => {this.recipes = serviceRecipes})
  }

  search(name: string) {
    const filtered = this.recipes.filter((recipe) => {return recipe.name.includes(name)})
    this.filteredRecipes = filtered;
  }
}
