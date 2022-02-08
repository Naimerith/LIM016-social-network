import { components } from '../view/components.js'

const changeView = (route) => {
  const container = document.getElementById('app');
  container.innerHTML = '';

  switch (route) {
    case '#/': {
      container.appendChild(components.Login());
      break;
    }
    case '#/register': {
      container.appendChild(components.Registro());
      break;
    }
    case '#/home': {
      container.appendChild(components.Home());
      break;
    }
    default:
      container.appendChild(components.Different());
      break;
  }
};
export { changeView }