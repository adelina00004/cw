import AbstractComponent from '../framework/view/abstract-component.js';
import HabitFormView from './habit-form-view.js';
import HabitListView from './habit-list-view.js';
import FilterView from './habit-filter-view.js';
import {render} from '../framework/render.js';

export default class MainView extends AbstractComponent {
    constructor() {
        super();
        this._habitFormView = new HabitFormView();
        this._habitListView = new HabitListView();
        this._filterView = new FilterView();
    }

    getTemplate() {
        return '<div class="habit-tracker"></div>';
    }

    _afterElementCreate() {
        render(this._habitFormView, this.getElement());
        render(this._filterView, this.getElement());
        render(this._habitListView, this.getElement());
    }

    setHabitAddHandler(handler) {
        this._habitFormView.setSubmitHandler(handler);
    }

    setHabitDeleteHandler(handler) {
        this._habitListView.setDeleteHandler(handler);
    }

    setHabitToggleHandler(handler) {
        this._habitListView.setToggleHandler(handler);
    }

    setFilterChangeHandler(handler) {
        this._filterView.setFilterChangeHandler(handler);
    }

    updateHabitsList(habits) {
        this._habitListView.update(habits);
    }
}