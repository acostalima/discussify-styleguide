# Modal

A modal dialog.

## Usage

**With a trigger:**

```jsx
import { Modal, ModalTrigger, Button } from '@discussify/styleguide';

const modal = <Modal>I'm a text in a modal.</Modal>;

// Simple usage, triggers when clicking
<ModalTrigger modal={ modal }>
    <Button variant="primary">Click me</Button>
</ModalTrigger>

// Equivalent to the previous one but with a children as a function
// You may use `isOpen` to highlight the trigger
<ModalTrigger modal={ modal }>
    { ({ isOpen, defaultEventProps }) =>
        <Button variant="primary" { ...defaultEventProps }>Click me</Button> }
</ModalTrigger>

// Custom trigger
<ModalTrigger modal={ modal }>
    { ({ open }) => <Button variant="primary" onMouseEnter={ open }>Hover me</Button> }
</ModalTrigger>
```

**Standalone usage:**

```jsx
import { Modal } from '@discussify/styleguide';

<Modal isOpen>I'm a text in a modal.</Modal>
```

### Configuring the app element

You must set the app element to properly hide your application from assistive technologies, such as screenreaders:

```js
import { Modal } from '@discussify/styleguide';

Modal.setAppElement('#root');
```

## ModalTrigger props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| modal | element | *required* | The modal to show |
| children | element, function | *required* | The trigger element or render prop function that should return the trigger element |

If `children` is a react element, event properties such as `onClick` will be added to it.
For advanced cases, `children` may be a render function which is called with:

```js
{
    // Boolean indicating if the modal is open
    isOpen,
    // Call this to open the modal, optionally with a delay
    open(delay = 0),
    // Call this to cancel a previously made `cancel` call
    cancelOpen(),
    // Call this to close the modal, optionally with a delay
    close(delay = 0),
     // Call this to toggle between open/close, optionally with a delay
    toggle(delay = 0),
    // Object with all event props that would have been added if the
    // trigger was an element
    defaultEventProps,
}
```

## Modal props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| contentClassName | string | | The CSS class to give to the content wrapper element |

Besides the ones listed above, all properties from [react-modal](http://reactcommunity.org/react-modal/#usage) are also supported.
By default, the `appElement` property is set to `#root`.

For accessibility reasons, be sure to define the `contentLabel` property.