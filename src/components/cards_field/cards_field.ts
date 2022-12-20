import { Card } from './../card/card';
import './cards_field.scss';
import { BaseComponent } from '../base_component';

const show_time = 15;

export class CardsField extends BaseComponent {
    private cards: Card[] = [];

    constructor() {
        super('div', ['cards_field'])
    }

    clear() {
        this.cards = [];
        this.element.innerHTML = '';
    }

    addCards(cards: Card[]) {
        this.cards = cards;
        this.cards.forEach((card) => this.element.append(card.element));
        setTimeout(() => {
            this.cards.forEach((card) => card.flipToBack());
        }, show_time * 1000);
    }
}