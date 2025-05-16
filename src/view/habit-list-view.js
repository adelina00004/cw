import AbstractComponent from '../framework/abstract-component.js';

export default class HabitListView extends AbstractComponent {
  getTemplate() {
    return `<ul class="habit-list"></ul>`;
  }

  clear() {
    this.getElement().innerHTML = '';
  }
}
