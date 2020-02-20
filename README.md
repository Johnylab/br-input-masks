# br-input-masks - Brazilian input masks

Some input masks to Brazilian specific form data. This is intended to use in ES6 apps.

## Instructions

### Use it

Run `npm install --save br-input-masks` or `yarn add br-input-masks` in your project folder.

Import and use the masks in your ES6 web app (or React Native):

```
import { bindInputMask, bindMasksByAttribute, masks } from 'br-input-masks';

// Bind all input fields with a [data-mask] attribute.
bindMasksByAttribute();

// Pass your own custom config attribute.
bindMasksByAttribute('ng-input-mask');

// Bind a mask to a specific element.
const input = document.querySelector('#my-input');
bindInputMask(input, 'date', 'input');

// Just convert a string.
const tel = masks.tel('1355559292');
const cell = masks.tel('13955559292');
console.log(tel, cell); // (13) 5555-9292 (13) 95555-9292
```

Contributions are welcome!
