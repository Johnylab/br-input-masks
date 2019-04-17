import * as masks from "./masks";

Object
  .entries(masks)
  .forEach(([name, mask]) => {
    const label = document.createElement('label');
    label.for = name;
    label.textContent = name;
    const input = document.createElement('input');
    input.name = name;
    input.id = name;
    input.addEventListener(
      'input',
      () => { input.value = mask(input.value); },
    );

    document.body.appendChild(label);
    document.body.appendChild(input);
  });
