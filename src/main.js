import Presenter from './presenter/presenter.js';
import TaskModel from './model/task-model.js';
import { generateHabits } from './mock/habits.js';

const container = document.querySelector('.container');
const taskModel = new TaskModel();

const habits = generateHabits(5);
taskModel.setHabits(habits);

const presenter = new Presenter(container, taskModel);
presenter.init();
