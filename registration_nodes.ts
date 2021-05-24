export default [
  {
    type: 'input',
    group: 'default',
    attributes: {
      name: 'csrf_token',
      type: 'hidden',
      value:
        'IwgUYj0XhfHw/97Ao78B+WLpcEo99hkBr2+K9N9rNvcl8nkdRXjHi017aJRYVq1lkHs4ZNSL8LrDN4F3S4Nx0w==',
      required: true,
      disabled: false,
    },
    messages: null,
    meta: {},
  },
  {
    type: 'input',
    group: 'password',
    attributes: { name: 'traits.email', type: 'email', disabled: false },
    messages: null,
    meta: { label: [Object] },
  },
  {
    type: 'input',
    group: 'password',
    attributes: {
      name: 'password',
      type: 'password',
      required: true,
      disabled: false,
    },
    messages: null,
    meta: { label: [Object] },
  },
  {
    type: 'input',
    group: 'password',
    attributes: { name: 'traits.name.first', type: 'text', disabled: false },
    messages: null,
    meta: { label: [Object] },
  },
  {
    type: 'input',
    group: 'password',
    attributes: { name: 'traits.name.last', type: 'text', disabled: false },
    messages: null,
    meta: { label: [Object] },
  },
  {
    type: 'input',
    group: 'password',
    attributes: {
      name: 'method',
      type: 'submit',
      value: 'password',
      disabled: false,
    },
    messages: null,
    meta: { label: [Object] },
  },
];
