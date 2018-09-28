import React, { Component } from 'react';
import './Range.css';

class Range extends Component {
  constructor(props) {
    super(props);
    this.status = {
      isMouseDown: false,
      rate: 0,
      cursorX: 0,
      startPosition: 0,
      endPosition: 0,
      currentHandle: 'end',
      isOverlapped: false,
    };
    this.state = {
      min: 0,
      max: 100,
      value: {
        start: 0,
        end: 0,
      },
      onChange: props.onChange || (() => {}),
      refs: {
        activeTrack: React.createRef(),
        startHandle: React.createRef(),
        endHandle: React.createRef(),
      },
      status: {
        isOverlapped: false,
      },
    };
  }

  handleMouseDown = (event) => {
    if (event.type === 'mousedown') {
      event.preventDefault();
    } else if (event.type === 'touchstart') {
      event = event.touches[0];
    }

    this.status.isMouseDown = true;
    this.status.currentHandle = event.target.getAttribute('data-handle-identifier') || event.target.parentElement.getAttribute('data-handle-identifier');
    this.status.startPosition = this.state.refs.startHandle.current.offsetLeft;
    this.status.endPosition = this.state.refs.endHandle.current.offsetLeft;
    this.status.cursorX = event.clientX;

    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);

    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('touchmove', this.handleMouseMove);
  };

  handleMouseUp = (event) => {
    event.preventDefault();

    this.state.isMouseDown = false;

    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);

    window.removeEventListener('touchend', this.handleMouseUp);
    window.removeEventListener('touchmove', this.handleMouseMove);

    this.setState({
      status: {
        ...this.state.status,
        isOverlapped: this.status.isOverlapped,
      },
    });
  };

  handleMouseMove = (event) => {
    if (event.type === 'mousedown') {
      event.preventDefault();
    } else if (event.type === 'touchmove') {
      event = event.touches[0];
    }

    let currentHandle;
    let newPosition;
    const delta = event.clientX - this.status.cursorX;

    if (this.status.currentHandle === 'start') {
      currentHandle = this.state.refs.startHandle.current;
      newPosition = this.status.startPosition + delta;
    } else if (this.status.currentHandle === 'end') {
      currentHandle = this.state.refs.endHandle.current;
      newPosition = this.status.endPosition + delta;
    }

    const handleMargin = currentHandle.clientWidth / 2;
    const maxSpace = currentHandle.parentElement.clientWidth;

    const leftEnd = 0 - handleMargin;
    const rightEnd = maxSpace - handleMargin;

    if (newPosition >= leftEnd && newPosition <= rightEnd) {

      if (this.status.currentHandle === 'start') {

        const otherHandle = this.state.refs.endHandle.current;
        const otherHandlePosition = otherHandle.offsetLeft;

        if (newPosition > otherHandlePosition) {
          this.isOverlapped = true;
          newPosition = (otherHandlePosition / maxSpace) * 100;
        } else {
          this.isOverlapped = false;
          newPosition = (newPosition / maxSpace) * 100;
        }

      } else if (this.status.currentHandle === 'end') {

        const otherHandle = this.state.refs.startHandle.current;
        const otherHandlePosition = otherHandle.offsetLeft;

        if (newPosition < otherHandlePosition) {
          this.isOverlapped = true;
          newPosition = (otherHandlePosition / maxSpace) * 100;
        } else {
          this.isOverlapped = false;
          newPosition = (newPosition / maxSpace) * 100;
        }

      }

    } else if (newPosition > rightEnd) {

      if (!this.isOverlapped) {
        newPosition = ((maxSpace - handleMargin) / maxSpace) * 100;
      } else {

        const otherHandle = this.state.refs.endHandle.current;
        const otherHandlePosition = otherHandle.offsetLeft;

        newPosition = (otherHandlePosition / maxSpace) * 100;

      }

    } else if (newPosition < leftEnd) {

      if (!this.isOverlapped) {
        newPosition = 0 - ((handleMargin / maxSpace) * 100);
      } else {

        const otherHandle = this.state.refs.startHandle.current;
        const otherHandlePosition = otherHandle.offsetLeft;

        newPosition = (otherHandlePosition / maxSpace) * 100;

      }
    } else {
      newPosition = (newPosition / maxSpace) * 100;
    }

    const total = ((parseFloat(newPosition) / 100) * maxSpace) + handleMargin;
    this.status.rate = (total / maxSpace) * 100;
    
    this.state.onChange(this.status.rate);

    currentHandle.style.left = `${newPosition}%`;



    const activeTrack = this.state.refs.activeTrack.current;

    const activeTrackLeft = ((this.state.refs.startHandle.current.offsetLeft + handleMargin) / maxSpace) * 100;
    const activeTrackWidth = ((this.state.refs.endHandle.current.offsetLeft - this.state.refs.startHandle.current.offsetLeft) / maxSpace) * 100;

    activeTrack.style.left = `${activeTrackLeft}%`;
    activeTrack.style.width = `${activeTrackWidth}%`;



    this.state.refs.startHandle.current.setAttribute('data-isoverlapped', this.isOverlapped);
    this.state.refs.endHandle.current.setAttribute('data-isoverlapped', this.isOverlapped);

  };

  handleClickOnTrack = (event) => {
    event.preventDefault();

    if (!event.target.classList.contains('RangeBar')) {
      return false;
    }

    const startHandle = this.state.refs.startHandle.current;
    const endHandle = this.state.refs.endHandle.current;

    const tapPos = (event.clientX - startHandle.parentElement.offsetLeft) - 18;
    const newPosition = (tapPos / startHandle.parentElement.clientWidth) * 100;

    if (tapPos < startHandle.offsetLeft) {
      startHandle.style.left = `${newPosition}%`;
    } else if (tapPos > endHandle.offsetLeft) {
      endHandle.style.left = `${newPosition}%`;
    }

    return true;

  }

  render() {
    return (
      <div className="Range">
        <div className="Range__input__element">
          <input
            type="range"
            min={this.state.min}
            max={this.state.max}
          />
        </div>
        <div className="Range__input">
          <div className="RangeBar" onMouseDown={this.handleClickOnTrack}>
            <div
              ref={this.state.refs.activeTrack}
              className="RangeBar__track"
            />
            <div
              ref={this.state.refs.startHandle}
              className="RangeBar__handle RangeBar__handle--start"
              data-handle-identifier="start"
              data-isoverlapped={this.state.status.isOverlapped}
              onMouseDownCapture={this.handleMouseDown}
              onTouchStartCapture={this.handleMouseDown}
            >
              <div className="RangeBar__handle__icon" />
            </div>
            <div
              ref={this.state.refs.endHandle}
              className="RangeBar__handle RangeBar__handle--end"
              data-handle-identifier="end"
              data-isoverlapped={this.state.status.isOverlapped}
              onMouseDownCapture={this.handleMouseDown}
              onTouchStartCapture={this.handleMouseDown}
            >
              <div className="RangeBar__handle__icon" />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Range;
