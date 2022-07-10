import { Ingredient } from '../shared/ingredient';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public id: number;

    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[], id?: number) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        if (typeof id == 'undefined') {
                this.id = Math.floor((Math.random() * 100) + 1);
        } else {
            this.id = id;
        }
    }
}