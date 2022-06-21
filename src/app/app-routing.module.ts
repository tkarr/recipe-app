import { Component, NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeResolver } from './recipe/recipe-detail/recipe-resolver.service';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoutes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'recipes', component: RecipeComponent, children: [
        {path: '', component: RecipeStartComponent},
        {path: 'details/:id', component: RecipeDetailComponent, resolve: {recipe: RecipeResolver}},
        {path: 'new', component: RecipeStartComponent},
        {path: 'details/:id/edit', component: RecipeEditComponent, resolve: {recipe: RecipeResolver}}
    ]}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)], 
    exports: [RouterModule]
})
export class AppRoutingModule {

}