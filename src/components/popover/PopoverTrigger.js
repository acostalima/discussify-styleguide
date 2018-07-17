import React, { Component, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Manager, Reference } from 'react-popper';

export default class PopoverTrigger extends Component {
    static propTypes = {
        popover: PropTypes.element,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    };

    constructor() {
        super();

        this.defaultEventProps = {
            onClick: this.handleOpen,
            onMouseEnter: () => this.handleOpen(PopoverTrigger.defaultHoverDelay),
            onMouseLeave: () => this.handleClose(PopoverTrigger.defaultHoverDelay),
        };
    }

    state = { isOpen: false };

    componentWillUnmount() {
        clearTimeout(this.openCloseTimeoutId);
        cancelAnimationFrame(this.scheduleUpdateRequestId);
    }

    render() {
        return (
            <Manager>
                <Reference>{ this.renderReference }</Reference>
                { this.renderPopover() }
            </Manager>
        );
    }

    renderReference = ({ ref }) => {
        this.setReferenceRef = ref;

        const { children: trigger } = this.props;
        const { isOpen } = this.state;

        if (typeof trigger === 'function') {
            const element = trigger({
                isOpen,
                open: this.handleOpen,
                cancelOpen: this.handleCancelOpen,
                close: this.handleClose,
                toggle: this.handleToggle,
                defaultEventProps: this.defaultEventProps,
            });

            return cloneElement(element, { ref: this.storeReferenceRef });
        }

        return cloneElement(trigger, {
            ...this.defaultEventProps,
            ref: this.storeReferenceRef,
        });
    };

    renderPopover = () => {
        const { isOpen } = this.state;
        const { popover } = this.props;

        return cloneElement(popover, {
            ref: this.storePopoverRef,
            isOpen,
            onRequestCancelClose: this.handlePopoverRequestCancelClose,
            onRequestClose: this.handlePopoverRequestClose,
        });
    };

    storeReferenceRef = (ref) => {
        this.referenceNode = findDOMNode(ref);

        this.setReferenceRef && this.setReferenceRef(this.referenceNode);
        this.popoverRef && this.popoverRef.setReferenceRef(this.referenceNode);
    };

    storePopoverRef = (ref) => {
        this.popover = ref;
        this.popover && this.popover.setReferenceRef(this.referenceNode);
    };

    handleOpen = (delay) => {
        clearTimeout(this.openCloseTimeoutId);
        this.pendingClose = false;

        this.openCloseTimeoutId = setTimeout(() => {
            this.setState({ isOpen: true });
        }, delay);
    };

    handleCancelOpen = () => {
        clearTimeout(this.openCloseTimeoutId);
    };

    handleClose = (delay) => {
        this.pendingClose = true;
        clearTimeout(this.openCloseTimeoutId);

        this.openCloseTimeoutId = setTimeout(() => {
            this.pendingClose = false;
            this.setState({ isOpen: false });
        }, delay);
    };

    handleToggle = (delay) => {
        if (this.state.isOpen) {
            this.handleClose(delay);
        } else {
            this.handleOpen(delay);
        }
    };

    handlePopoverRequestCancelClose = () => {
        clearTimeout(this.openCloseTimeoutId);
    };

    handlePopoverRequestClose = (e, reason) => {
        const isMouseLeave = reason === 'mouseLeave';

        // If the reason to close is `mouseLeave`, only close it if there's a pending close
        // We only want to "override" de trigger for `escapePress` / `closeOutside`
        if (isMouseLeave && !this.pendingClose) {
            return;
        }

        this.pendingClose = false;
        clearTimeout(this.openCloseTimeoutId);

        this.openCloseTimeoutId = setTimeout(() => {
            this.setState({ isOpen: false });
        }, isMouseLeave ? PopoverTrigger.defaultHoverDelay : 0);
    };

    static defaultHoverDelay = 200;
}
