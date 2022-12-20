import { CardsField } from './../cards_field/cards_field';
import { Card } from './../card/card';
import { BaseComponent } from './../base_component';
import { delay } from '../../functions/delay';

const flip_delay = 3000;

export class Game extends BaseComponent {
    private readonly cardsField: CardsField;
    private activeCard?: Card;
    private isAnimation = false;

    constructor() {
        super();
        this.cardsField = new CardsField();
        this.element.append(this.cardsField.element);
    }

    newGame(images: string[]) {
        this.cardsField.clear();
        const cards = images
        .concat(images)
        .map((url) => new Card(url))
        .sort(() => Math.random() - .5);

        cards.forEach((card) => {
            card.element.addEventListener('click', () => this.cardHandler(card));
        });

        this.cardsField.addCards(cards);
    }

    private async cardHandler(card: Card) {
        if (this.isAnimation) return;
        this.isAnimation = true;

        await card.flipToFront();

        if (!this.activeCard) {
            this.activeCard = card;
            return;
        }

        if (this.activeCard.image != card.image) {
            await delay(flip_delay);
            await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
        }

        this.activeCard = undefined;
        this.isAnimation = false;
    }
}