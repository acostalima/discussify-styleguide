import React, { Component, createRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { random } from 'lodash';
import onTransitionEnd from 'proper-on-transition-end';
import styles from './ProgressBar.css';

const INCREMENT_INTERVAL = 300;
const MAX_PROGRESS = 0.95;

export default class ProgressBar extends Component {
    static propTypes = {
        running: PropTypes.bool.isRequired,
        onBegin: PropTypes.func,
        onEnd: PropTypes.func,
        onReset: PropTypes.func,
        style: PropTypes.object,
        className: PropTypes.string,
    };

    progressBarRef = createRef();

    componentDidMount() {
        this.maybeHandleRunningChange(false);
    }

    componentDidUpdate(prevProps) {
        this.maybeHandleRunningChange(prevProps.running);
    }

    componentWillUnmount() {
        this.clearTimersAndListeners();
    }

    render() {
        const { running, style, className, onBegin, onEnd, onReset, ...rest } = this.props;

        return (
            <div
                { ...rest }
                ref={ this.progressBarRef }
                className={ classNames(styles.progressBar, className) } />
        );
    }

    maybeHandleRunningChange(prevRunning) {
        const { running } = this.props;

        // Skip if `running` hasn't changed
        if (running === prevRunning) {
            return;
        }

        if (running) {
            this.begin();
        } else {
            this.end();
        }
    }

    begin() {
        this.currentProgress > 0 && this.reset();

        this.clearTimersAndListeners();
        this.currentProgress = 0;

        this.incrementTickIntervalId = setInterval(this.incrementTick, INCREMENT_INTERVAL);

        this.props.onBegin && this.props.onBegin();
    }

    end() {
        this.clearTimersAndListeners();
        this.currentProgress = 1;

        this.progressBarRef.current.style.transform = 'scaleX(1)';
        this.cancelOnTransitionEnd = onTransitionEnd(this.progressBarRef.current, () => {
            this.props.onEnd && this.props.onEnd();

            this.progressBarRef.current.style.opacity = '0';
            this.cancelOnTransitionEnd = onTransitionEnd(this.progressBarRef.current, () => this.reset);
        });
    }

    reset = () => {
        this.clearTimersAndListeners();
        this.currentProgress = 0;

        this.progressBarRef.current.style.transition = 'none';
        this.progressBarRef.current.style.transform = '';
        this.progressBarRef.current.style.opacity = '';
        this.progressBarRef.current.offsetHeight; // eslint-disable-line no-unused-expressions
        this.progressBarRef.current.style.transition = '';

        this.props.onReset && this.props.onReset();
    };

    clearTimersAndListeners() {
        clearInterval(this.incrementTickIntervalId);
        this.cancelOnTransitionEnd && this.cancelOnTransitionEnd();
    }

    incrementTick = () => {
        const increment = this.determineIncrement();

        // Reached the maximum allowed?
        if (increment <= 0) {
            this.clearTimersAndListeners();

            return;
        }

        this.currentProgress += increment;
        this.progressBarRef.current.style.transform = `scaleX(${this.currentProgress})`;
    };

    determineIncrement() {
        let increment;

        if (this.currentProgress > 0.65) {
            increment = (1 - this.currentProgress) / 10;
        } else {
            increment = random(0.05, 0.2, true);
        }

        if (this.currentProgress + increment > MAX_PROGRESS) {
            return MAX_PROGRESS - this.currentProgress;
        }

        return increment;
    }
}
