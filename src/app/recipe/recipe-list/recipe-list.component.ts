import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe-detail/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  //recipes: Recipe[] = [new Recipe('Fried Rice', 'Fried Rice with veggies', 'https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice.jpg'),
  //new Recipe('Hummus', 'Garlic and lemon hummus', 'https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice.jpg')];
  recipes: Recipe[];
  private recipeSubscription: Subscription;
  
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipesSub.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
