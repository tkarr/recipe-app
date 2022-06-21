import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient';
import { ShoppingListService } from '../shopping-list/shoppinglist.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, AfterViewInit {

  //takes input from parent component
  @Input() editIngredients = [];
  isShoppingListEditDisplayed = false;
  ingredientsToRemove = [];

  @ViewChild('f') newIngredientForm: NgForm;

  @Output() newIngredientAdded = new EventEmitter<Ingredient>();

  constructor(private slService: ShoppingListService) {
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  onAddNewIngredient() {
    if (this.newIngredientForm.value.name === '') {      this.newIngredientForm.reset();
    } else {
      console.log(this.newIngredientForm);
      this.slService.onIngredientAdded(new Ingredient(this.newIngredientForm.value.name, this.newIngredientForm.value.amount));
    }
    

  }

  removeIngredient(name: string) {
    console.log("remove ingredient: " + name);
    this.slService.removeIngredient(name);
  }

  removeSelectedIngredients() {
    this.editIngredients = this.editIngredients.filter(item => this.ingredientsToRemove.indexOf(item.name) === -1);
    console.log(this.editIngredients)
  }

  toggleShoppingListEdit(): void {
    this.isShoppingListEditDisplayed = !this.isShoppingListEditDisplayed;
  }

  ingredientSelected(event): void {
    console.log("ing selected");
    if (event.target.checked) {
      this.ingredientsToRemove.push(event.target.parentElement.textContent.trim());
    } else {
      this.ingredientsToRemove = this.ingredientsToRemove.filter(item => item != event.target.parentElement.textContent.trim());
    }
  }
}
