import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../../recipe/recipe-detail/recipe.service';
import { FormGroup, Form, NgForm } from '@angular/forms';
import { Recipe } from '../../recipe/recipe.model';
import { Ingredient } from '../../shared/ingredient';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, AfterViewInit {
  @ViewChild('f') editForm: NgForm;
  @ViewChild('ingForm') ingForm: NgForm;
  id: number;
  recipe: Recipe;
  editMode = false;
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
      );
    this.recipeService.getRecipe(this.id).subscribe((recipe) => {this.recipe = recipe});
  }

  ngAfterViewInit(): void {
    //had to wrap in setTimeout in order for form to be ready
    setTimeout(() => {
                            this.editForm.form.patchValue({name: this.recipe.name,
                            description: this.recipe.description,
                            imagePath: this.recipe.imagePath,
                            ingredients: this.recipe.ingredients});
    }, );  
  }

  onSubmit() {
    this.recipe.description = this.editForm.value.description;
    this.recipe.name = this.editForm.value.name;
    this.recipe.imagePath = this.editForm.value.imagePath;
  }

  addIngredient(): void {
    const ing = new Ingredient(this.ingForm.value.name, this.ingForm.value.amount);
    this.recipe.ingredients.push(ing);
  }

}
