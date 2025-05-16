import AbstractComponent from '../framework/abstract-component.js';

export default class AbstractView extends AbstractComponent {
    constructor() {
        super();
    }

    getTemplate() {
        throw new Error('Abstract method not implemented: getTemplate');
    }
}
