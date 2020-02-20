import * as masks from './src/masks';

export const bindInputMask = (
  input, maskName, eventName = 'input'
) => {
  const applyMask = masks[maskName];

  if (!(applyMask instanceof Function)) {
    console.error(`${maskName} is not a valid mask.`);
    return;
  }

  input.addEventListener(eventName, () => {
    const { value } = input;
    input.value = applyMask(value);
  });
};

export const bindMasksByAttribute = (attrName = 'data-mask', context = document) => {
  const inputs = context.querySelectorAll(`[${attrName}]`);
  Array.prototype.forEach.call(inputs, (input) => {
    const maskName = input.getAttribute(attrName);

    if (!maskName) {
      console.error('No mask defined for input', input);
      return;
    }

    bindInputMask(input, maskName);
  });
}

export { masks };
