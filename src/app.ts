import { Game } from './components/game/game';
import { ImageCategoryModel } from './models/image_category_model';

export class App {
    private readonly game: Game;

    constructor(private readonly rootElement: HTMLElement) {
        this.game = new Game();
        this.rootElement.append(this.game.element);
    }

    async start() {
        const res = await fetch('./images.json');
        const categories: ImageCategoryModel[] = await res.json();
        const cat = categories[0];
        const images = cat.images.map((name) => `${cat.category}/${name}`);
        this.game.newGame(images);
    }
}