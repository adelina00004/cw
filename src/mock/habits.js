import { generateId } from '../utils.js';

const generateHabit = () => {
  const statuses = ['active', 'completed'];

  return {
    id: generateId(),
    title: `Habit ${Math.random()}`,
    description: 'Some description',
    status: statuses[Math.floor(Math.random() * statuses.length)],
  };
};

const generateHabits = (count) => {
  return Array.from({ length: count }, () => generateHabit());
};

export { generateHabits };
