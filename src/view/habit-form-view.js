import AbstractComponent from '../framework/abstract-component.js';

export default class HabitFormView extends AbstractComponent {
  constructor() {
    super();
    this._addHabitHandler = null;
  }

  getTemplate() {
    return `
      <form id="habit-form">
        <label for="habit-name">Название привычки:</label>
        <input type="text" id="habit-name" placeholder="Например, Утренняя зарядка" required />

        <label for="habit-description">Описание:</label>
        <textarea id="habit-description" placeholder="Описание привычки" rows="3"></textarea>

        <label for="habit-status">Статус привычки:</label>
        <select id="habit-status" required>
            <option value="active">Активна</option>
            <option value="completed">Завершена</option>
        </select>

        <button type="submit">Добавить Привычку</button>
      </form>
    `;
  }

  setAddHabitHandler(callback) {
    this._addHabitHandler = callback;
    this.getElement().addEventListener('submit', this._formSubmitHandler.bind(this));
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    const nameInput = this.getElement().querySelector('#habit-name');
    const descriptionInput = this.getElement().querySelector('#habit-description');
    const statusInput = this.getElement().querySelector('#habit-status');

    const newHabit = {
      title: nameInput.value,
      description: descriptionInput.value,
      status: statusInput.value,
    };

    this._addHabitHandler(newHabit);

    nameInput.value = '';
    descriptionInput.value = '';
    statusInput.value = 'active';
  }
}
