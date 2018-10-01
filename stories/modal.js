import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean, text, selectV2 } from '@storybook/addon-knobs';
import { Modal, ModalTrigger, ConfirmModal, Button } from '../src';
import readme from '../src/components/modal/README.md';

Modal.setAppElement('#root');

/* eslint-disable max-len */
const LoremIpsumModal = (props) => (
    <Modal { ...props }>
        Nullam a felis porta, sollicitudin justo vel, <a href="#foo">dignissim</a> libero. Integer venenatis tincidunt enim, sit amet sagittis erat suscipit et. Aenean consequat erat egestas fringilla bibendum. Ut malesuada risus dui, id maximus dolor accumsan vitae. Pellentesque dictum erat sed auctor suscipit. Aliquam eu iaculis nunc, a gravida nunc. Quisque erat lacus, iaculis ut rutrum id, condimentum id magna. Aliquam at nisi lobortis, gravida mi a, malesuada orci. Pellentesque non sollicitudin est, in rhoncus mauris. Nulla nulla nibh, ultricies ut <a href="#foo">nulla</a> sit amet, scelerisque feugiat neque. Donec at lectus ultrices, sollicitudin lacus ut, cursus eros. Maecenas nunc turpis, vestibulum vitae consequat in, eleifend aliquam mi. Curabitur sed nulla in nisi posuere mattis. Nunc faucibus scelerisque imperdiet. Proin fermentum rutrum quam, vitae sagittis est rhoncus nec. Integer auctor, libero eu convallis pellentesque, odio risus cursus tortor, tincidunt tincidunt magna diam vel magna.
    </Modal>
);
/* eslint-enable max-len */

storiesOf('Modal', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Standalone', () => (
    <LoremIpsumModal isOpen />
))
.add('Standard trigger', () => (
    <ModalTrigger modal={ <LoremIpsumModal /> }>
        <Button variant="primary">Click me</Button>
    </ModalTrigger>
))
/* eslint-disable react/jsx-no-bind */
.add('Custom trigger (hover)', () => (
    <ModalTrigger modal={ <LoremIpsumModal /> }>
        { ({ open, cancelOpen }) => (
            <Button
                variant="primary"
                onMouseEnter={ () => open(200) }
                onMouseLeave={ cancelOpen }>Hover me</Button>
        ) }
    </ModalTrigger>
))
.add('Within scrollable body', () => (
    <div style={ { height: 20000 } }>
        <div style={ { height: 200 } } />

        <ModalTrigger modal={ <LoremIpsumModal /> }>
            <Button variant="primary">Click me</Button>
        </ModalTrigger>
    </div>
))
/* eslint-disable react/jsx-no-bind, react/prop-types */
.add('Knobs playground ⚽', () => {
    const trigger = selectV2('trigger', ['standard', 'hover'], 'standard');
    const shouldCloseOnEsc = boolean('shouldCloseOnEsc', true);
    const shouldCloseOnOverlayClick = boolean('shouldCloseOnOverlayClick', true);
    const contentLabel = text('contentLabel', 'My awesome modal');
    const content = text('content', 'My awesome modal contents');

    const modal = (
        <Modal
            shouldCloseOnEsc={ shouldCloseOnEsc }
            shouldCloseOnOverlayClick={ shouldCloseOnOverlayClick }
            contentLabel={ contentLabel }>
            { content }
        </Modal>
    );

    return (
        <ModalTrigger modal={ modal }>
            { (() => {
                switch (trigger) {
                case 'hover':
                    return ({ open, cancelOpen }) => (
                        <Button
                            variant="primary"
                            onMouseEnter={ () => open(200) }
                            onMouseLeave={ cancelOpen }>Hover me</Button>
                    );
                default:
                    return <Button variant="primary">Click me</Button>;
                }
            })() }
        </ModalTrigger>
    );
});

storiesOf('Modal/Turnkey', module)
.addDecorator(withReadme(readme))
.add('ConfirmModal', () => (
    <ConfirmModal
        onConfirm={ () => console.log('confirmed') }
        onCancel={ () => console.log('canceled') }
        isOpen />
));
/* eslint-disable react/jsx-no-bind */
