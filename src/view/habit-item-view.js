import AbstractComponent from '../framework/abstract-component.js';

export default class HabitItemView extends AbstractComponent {
  constructor(habit) {
    super();
    this._habit = habit;

    this._deleteClickHandler = null;
    this._toggleStatusHandler = null;
    this._editClickHandler = null;
  }

  getTemplate() {
    return `
      <li class="habit-item">
        <div class="title">${this._habit.title}</div>
        <div class="description">${this._habit.description}</div>
        <div class="status">Статус: ${this._habit.status}</div>
        <button class="toggle-status-button">${this._habit.status === 'active' ? 'Завершить' : 'Активировать'}</button>
        <button class="edit-button">Редактировать</button>
        <button class="delete-button">Удалить</button>
      </li>
    `;
  }

  setDeleteClickHandler(callback) {
    this._deleteClickHandler = callback;
    this.getElement().querySelector('.delete-button').addEventListener('click', this._deleteClickHandler);
  }

  setToggleStatusHandler(callback) {
    this._toggleStatusHandler = callback;
    this.getElement().querySelector('.toggle-status-button').addEventListener('click', this._toggleStatusHandler);
  }

  setEditClickHandler(callback) {
    this._editClickHandler = callback;
    this.getElement().querySelector('.edit-button').addEventListener('click', this._editClickHandler);
  }
}
