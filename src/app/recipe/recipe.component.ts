import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe-detail/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers : []
})
export class RecipeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
