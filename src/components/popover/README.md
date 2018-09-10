# Popover

A popover to display content anchored to an element.

## Usage

```jsx
import { PopoverTrigger, Popover } from '@discussify/styleguide';

const popover = <Popover>I'm a text in a popover.</Popover>

// Simple usage, triggers when clicking and hovering
<PopoverTrigger popover={ popover }>
    <Button variant="primary">Click or hover me</Button>
</PopoverTrigger>

// Equivalent to the previous one but with a children as a function
// You may use `isOpen` to highlight the trigger
<PopoverTrigger popover={ popover }>
    { ({ isOpen, defaultEventProps }) =>
        <Button variant="primary" { ...defaultEventProps }>Click or hover me</Button> }
</PopoverTrigger>

// Custom trigger
<PopoverTrigger popover={ popover }>
    { ({ toggle }) => <Button variant="primary" onClick={ toggle }>Click me</Button> }
</PopoverTrigger>
```

The usage is very similar to the `Modal` component, except that `Popover` can't be used standalone.

Please note that both the popover and the trigger must support attaching refs. If you are using stateless components, be sure to use [forwardRef](https://reactjs.org/docs/forwarding-refs.html).

## PopoverTrigger props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| popover | element | *required* | The popover to show |
| children | element, function | *required* | The trigger element or render prop function that should return the trigger element |

If `children` is a react element, event properties such as `onClick` will be added to it.
For advanced cases, `children` may be a render function which is called with:

```js
{
    // Boolean indicating if the popover is open
    isOpen,
    // Call this to open the popover, optionally with a delay
    open(delay = 0),
    // Call this to cancel a previously made `cancel` call
    cancelOpen(),
    // Call this to close the popover, optionally with a delay
    close(delay = 0),
    // Call this to toggle between open/close, optionally with a delay
    toggle(delay = 0),
    // Object with all event props that would have been added if the
    // trigger was an element
    defaultEventProps,
}
```

You may access `PopoverTrigger.defaultHoverDelay` to get the standard mouse enter/leave delay.

## Popover props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| placement | string | auto | The popover placement, can be one of: `auto`, `top`, `right`, `left`, `bottom` |
| viewportMargin | number | 10 | Specifies how close to the edge of the window the popover can appear (in pixels) |
| boxClassName | string | | The CSS class to give to the box element that wraps the content element (useful to adjust padding or size) |
| contentClassName | string | | The CSS class to give to the content element |
| shouldCloseOnEsc | bool | true | True to close on escape keypress |
| shouldCloseOnOutsideClick | bool | true | True to close when clicking outside the popover |
| children | node | *<required>* | The popover contents |

Any other properties supplied will be spread to the root element (popover).

Important notes:

- The popover doesn't have a with nor height set and will adjust itself based on its contents. You may define a size by passing a `boxClassName`.
- The popover content will have a padding of `2em` by default. You may redefine it by passing `boxClassName` as well.
