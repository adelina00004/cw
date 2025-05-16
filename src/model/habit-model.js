export default class TaskModel {
  constructor() {
    this._habits = [];
    this._observers = [];
  }

  getHabits() {
    return this._habits;
  }

  setHabits(habits) {
    this._habits = Array.from(habits);
    this._notify(this._observers);
  }

  addHabit(habit) {
    this._habits.push(habit);
    this._notify(this._observers);
  }

  removeHabit(id) {
    this._habits = this._habits.filter((habit) => habit.id !== id);
    this._notify(this._observers);
  }

  updateHabit(id, updatedHabit) {
    this._habits = this._habits.map((habit) =>
      habit.id === id ? { ...habit, ...updatedHabit } : habit
    );
    this._notify(this._observers);
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers = this._observers.filter((obs) => obs !== observer);
  }

  _notify(observers) {
    observers.forEach((observer) => observer());
  }
}
