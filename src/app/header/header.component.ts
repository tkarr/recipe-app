import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() shoppingListToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  isShoppingListDisplayed = false;
  isRecipeBookDisplayed = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleShoppingList(val: boolean): void {
    this.isShoppingListDisplayed = val;
    this.isRecipeBookDisplayed = !val;
    this.shoppingListToggled.emit(this.isShoppingListDisplayed);
    console.log("toggle shopping list: " + this.isShoppingListDisplayed);
  }

  toggleRecipeBook(): void {
    this.isRecipeBookDisplayed = !this.isRecipeBookDisplayed;
  }
}
