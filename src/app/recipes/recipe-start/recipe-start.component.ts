import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { RecipeService } from '../../recipe/recipe-detail/recipe.service';
import { Recipe } from 'src/app/recipe/recipe.model';
import { Ingredient } from '../../shared/ingredient';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  ingredients: Ingredient[];
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.ingredients = [];
  }

  onSubmit() {
    var newRecipe = new Recipe(this.form.value.name,
                           this.form.value.description,
                           this.form.value.imagePath,
                           this.ingredients);
                           
    this.recipeService.addRecipe(newRecipe).subscribe();
    this.form.reset();
    this.ingredients = [];
  }

  addIngredient(ingForm: NgForm) {
    var ing = new Ingredient(ingForm.value.name, ingForm.value.amount);
    this.ingredients.push(ing);
    ingForm.reset();
  }
}
