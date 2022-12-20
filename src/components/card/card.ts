import { BaseComponent } from './../base_component';
import './card.scss';

const flip_class = 'flipped';

export class Card extends BaseComponent {
    constructor(readonly image: string) {
        super('div', ['card_container']);

        this.element.innerHTML = `
        <div class="card">
            <div class="card front" style="background-image: url('./images/${image}')"></div>
            <div class="card back"></div>
        </div>
        `;
    }

    flipToBack() {
        return this.flip(true);
    }

    flipToFront() {
        return this.flip(false);
    }

    private flip(isFront = false): Promise<void> {
        return new Promise((resolve) => {
            this.element.classList.toggle(flip_class, !isFront);
            this.element.addEventListener('transitionend', () => resolve(), {
                once: true,
            });
        })
    }
}