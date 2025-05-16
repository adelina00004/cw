import HabitListView from '../view/habit-list-view.js';
import HabitItemView from '../view/habit-item-view.js';
import HabitFormView from '../view/habit-form-view.js';
import HabitFilterView from '../view/habit-filter-view.js';
import { render, replace, remove } from '../framework/render.js';
import { generateId } from '../utils.js';

export default class Presenter {
  constructor(container, taskModel) {
    this._container = container;
    this._taskModel = taskModel;

    this._habitListView = new HabitListView();
    this._habitFormView = new HabitFormView();
    this._habitFilterView = new HabitFilterView();

    this._habits = [];
    this._currentFilter = 'all';

    this._habitFormView.setAddHabitHandler(this._handleAddHabit.bind(this));
    this._habitFilterView.setFilterChangeHandler(this._handleFilterChange.bind(this));

    this._taskModel.addObserver(this._handleModelEvent.bind(this));
  }

  init() {
    this._habits = this._taskModel.getHabits();
    render(this._container, this._habitFormView);
    render(this._container, this._habitFilterView);
    render(this._container, this._habitListView);
    this._renderHabits(this._habits);
  }

  _renderHabit(habit) {
    const habitItemView = new HabitItemView(habit);

    habitItemView.setDeleteClickHandler(() => this._handleDeleteHabit(habit.id));
    habitItemView.setToggleStatusHandler(() => this._handleToggleStatus(habit.id, habit.status === 'active' ? 'completed' : 'active'));
    habitItemView.setEditClickHandler(() => this._handleEditHabit(habit));

    render(this._habitListView.getElement(), habitItemView);
  }

  _renderHabits(habits) {
    this._habitListView.clear();
    const filteredHabits = this._filterHabits(habits, this._currentFilter);
    filteredHabits.forEach((habit) => this._renderHabit(habit));
  }

  _clearHabitList() {
    this._habits.forEach((habit) => {
      remove(this._habitItemViews[habit.id]);
    });
    this._habitItemViews = {};
  }

  _filterHabits(habits, filterType) {
    switch (filterType) {
      case 'active':
        return habits.filter((habit) => habit.status === 'active');
      case 'completed':
        return habits.filter((habit) => habit.status === 'completed');
      default:
        return habits;
    }
  }

  _handleFilterChange(filterType) {
    this._currentFilter = filterType;
    this._renderHabits(this._taskModel.getHabits());
  }

  _handleAddHabit(newHabit) {
    const habit = { ...newHabit, id: generateId() };
    this._taskModel.addHabit(habit);
  }

  _handleDeleteHabit(habitId) {
    this._taskModel.removeHabit(habitId);
  }

  _handleToggleStatus(habitId, newStatus) {
    this._taskModel.updateHabit(habitId, { status: newStatus });
  }

  _handleEditHabit(habit) {
      const newTitle = prompt('Введите новое название для привычки', habit.title);
      if (newTitle) {
          this._taskModel.updateHabit(habit.id, { title: newTitle });
      }
  }

  _handleModelEvent() {
    this._renderHabits(this._taskModel.getHabits());
  }
}
