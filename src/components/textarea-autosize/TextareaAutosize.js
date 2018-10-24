import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import growElementFn from '@moxy/grow-element-fn';
import { debounce } from 'lodash';
import styles from './TextareaAutosize.css';

export default class TextareaAutosize extends Component {
    static propTypes = {
        rows: PropTypes.number,
        maxRows: PropTypes.number,
        animate: PropTypes.bool,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        className: PropTypes.string,
    };

    static defaultProps = {
        rows: 1,
        animate: true,
    };

    componentDidMount() {
        this.updateSize();
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate() {
        this.updateSize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const { className, maxRows, animate, ...rest } = this.props;
        const finalClassName = classNames(styles.textareaAutosize, animate && styles.animate, className);

        return (
            <textarea
                { ...rest }
                ref={ this.storeNode }
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                className={ finalClassName } />
        );
    }

    storeNode = (ref) => {
        this.node = findDOMNode(ref);

        if (this.node) {
            this.node.addEventListener('focus', this.updateSize);
            this.node.addEventListener('blur', this.updateSize);
            this.node.addEventListener('input', this.updateSize);
        }
    };

    updateSize = () => {
        this.node && growElementFn({
            el: this.node,
            minLines: this.props.rows,
            maxLines: this.props.maxRows,
            extraLine: this.focused,
        });
    };

    handleFocus = () => {
        this.focused = true;
        this.updateSize();
        this.props.onFocus && this.props.onFocus();
    };

    handleBlur = () => {
        this.focused = false;
        this.updateSize();
        this.props.onBlur && this.props.onBlur();
    };

    handleResize = debounce(() => this.updateSize(), 500);
}