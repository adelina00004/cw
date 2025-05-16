export const render = (container, component, place = 'beforeend') => {
  container.insertAdjacentElement(place, component.getElement());
};

export const replace = (newComponent, oldComponent) => {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const parent = oldElement.parentElement;

  if (parent === null) {
    throw new Error("Can't replace unmounted components");
  }

  parent.replaceChild(newElement, oldElement);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractComponent)) {
    throw new Error("Can remove only components");
  }

  component.getElement().remove();
  component.removeElement();
};

import AbstractComponent from "./abstract-component";
