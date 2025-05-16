import AbstractComponent from '../framework/abstract-component.js';

export default class HabitFilterView extends AbstractComponent {
  constructor() {
    super();
    this._filterChangeHandler = null;
  }

  getTemplate() {
    return `
      <div class="habit-filter">
        <h2>Фильтр привычек</h2>
        <label for="filter-status">Статус:</label>
        <select id="filter-status">
            <option value="all">Все</option>
            <option value="active">Активные</option>
            <option value="completed">Завершенные</option>
        </select>
      </div>
    `;
  }

  setFilterChangeHandler(callback) {
    this._filterChangeHandler = callback;
    this.getElement().querySelector('#filter-status').addEventListener('change', this._filterChangeHandlerWrapper.bind(this));
  }

  _filterChangeHandlerWrapper(evt) {
    evt.preventDefault();
    this._filterChangeHandler(evt.target.value);
  }
}
