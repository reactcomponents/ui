import React, { Component } from 'react';
import './Range.css';

class Range extends Component {
  constructor(props) {
    super(props);
    this.status = {
      isMouseDown: false,
      currentHandle: 'end',
      isOverlapped: false,
    };
    this.handle = {
      current: null,
      other: null,
      offsetLeft: {
        current: 0,
        other: 0,
      },
      cursorX: 0,
      correction: 0,
    };
    this.track = {
      leftEnd: 0,
      rightEnd: 0,
      availableSpace: 0,
    };
    this.value = {
      start: 0,
      end: 0,
      total: 0,
    };
    this.state = {
      name: props.name,
      type: props.type || 'slider',
      value: this.value,
      onChange: props.onChange || (() => {}),
      onChangeWatch: props.onChangeWatch || (() => {}),
      __onChange: props.__onChange || (() => { }),
      __onInit: props.__onInit || (() => { }),
      refs: {
        track: React.createRef(),
        activeTrack: React.createRef(),
        startHandle: React.createRef(),
        endHandle: React.createRef(),
      },
      status: {
        isOverlapped: false,
      },
    };
  }

  componentWillMount() {
    this.state.__onInit(this.state.name, this.state.value);
  }

  setOverlapping = (status) => {
    this.status.isOverlapped = status;
    this.state.refs.track.current.setAttribute('data-isoverlapped', status);
  }

  init = () => {

    const {
      startHandle,
      endHandle,
    } = this.state.refs;

    if (this.status.currentHandle === 'start') {
      this.handle.current = startHandle.current;
      this.handle.other = endHandle.current;
    } else if (this.status.currentHandle === 'end') {
      this.handle.current = endHandle.current;
      this.handle.other = startHandle.current;
    }

    this.handle.correction = this.handle.current.clientWidth / 2;

    this.handle.offsetLeft.current = this.handle.current.offsetLeft;
    if (this.state.type !== 'slider') {
      this.handle.offsetLeft.other = this.handle.other.offsetLeft;
    }


    const track = this.state.refs.track.current;

    this.track.availableSpace = track.clientWidth;
    this.track.leftEnd = 0 - this.handle.correction;
    this.track.rightEnd = this.track.availableSpace + this.track.leftEnd;

  }

  handleDragStart = (event) => {
    if (event.type === 'mousedown') {
      event.preventDefault();
    } else if (event.type === 'touchstart') {
      event = event.touches[0];
    }


    this.status.isMouseDown = true;
    this.handle.cursorX = event.clientX;

    this.status.currentHandle = event.target.getAttribute('data-handle-identifier') || 'end';

    this.init();


    if (event.target.classList.contains('RangeBar') || event.target.classList.contains('RangeBar__track')) {
      this.handleClickOnTrack(event);
    }

    window.addEventListener('mouseup', this.handleDragStop);
    window.addEventListener('mousemove', this.handleDragMove);

    window.addEventListener('touchend', this.handleDragStop);
    window.addEventListener('touchmove', this.handleDragMove);

  };

  handleDragStop = (event) => {
    event.preventDefault();

    this.state.isMouseDown = false;

    window.removeEventListener('mouseup', this.handleDragStop);
    window.removeEventListener('mousemove', this.handleDragMove);

    window.removeEventListener('touchend', this.handleDragStop);
    window.removeEventListener('touchmove', this.handleDragMove);

    this.setState({
      value: this.value,
      status: {
        ...this.state.status,
        isOverlapped: this.status.isOverlapped,
      },
    });

    this.state.onChange(this.value);
    this.state.__onChange(this.state.name, this.value);

  };

  handleDragMove = (event) => {
    if (event.type === 'mousedown') {
      event.preventDefault();
    } else if (event.type === 'touchmove') {
      event = event.touches[0];
    }

    const delta = event.clientX - this.handle.cursorX;

    let newPosition = this.handle.offsetLeft.current + delta;

    const { correction } = this.handle;

    const {
      leftEnd,
      rightEnd,
      availableSpace,
    } = this.track;


    const otherHandle = this.handle.other;

    if (newPosition >= leftEnd && newPosition <= rightEnd) {

      if (this.state.type !== 'slider') {

        let isOverlapped = false;

        if (this.status.currentHandle === 'start') {
          isOverlapped = (newPosition > otherHandle.offsetLeft);
        } else if (this.status.currentHandle === 'end') {
          isOverlapped = (newPosition < otherHandle.offsetLeft);
        }

        this.setOverlapping(isOverlapped);
        newPosition = isOverlapped ? otherHandle.offsetLeft : newPosition;

      }

    } else if (newPosition > rightEnd) {

      newPosition = this.status.isOverlapped ? otherHandle.offsetLeft : availableSpace - correction;

    } else if (newPosition < leftEnd) {

      newPosition = this.status.isOverlapped ? otherHandle.offsetLeft : 0 - correction;

    }


    this.updateHandle(newPosition);

  }

  updateHandle = (newPosition = null) => {

    if (newPosition) {

      const { availableSpace } = this.track;
      const newPosPercent = (newPosition / availableSpace) * 100;

      this.handle.current.style.left = `${newPosPercent}%`;

      this.updateActiveTrack();

    }

  }

  updateActiveTrack = () => {

    const startHandle = this.state.refs.startHandle.current;
    const endHandle = this.state.refs.endHandle.current;
    const activeTrack = this.state.refs.activeTrack.current;

    const { correction } = this.handle;
    const { availableSpace } = this.track;

    let activeTrackLeft;
    let activeTrackWidth;

    if (this.state.type !== 'slider') {
      activeTrackLeft = ((startHandle.offsetLeft + correction) / availableSpace) * 100;
      activeTrackWidth = ((endHandle.offsetLeft - startHandle.offsetLeft) / availableSpace) * 100;
    } else {
      activeTrackLeft = 0;
      activeTrackWidth = ((endHandle.offsetLeft + correction) / availableSpace) * 100;
    }

    activeTrack.style.left = `${activeTrackLeft}%`;
    activeTrack.style.width = `${activeTrackWidth}%`;


    if (this.state.type !== 'slider') {
      const startRangePercent = ((startHandle.offsetLeft + correction) / availableSpace) * 100;
      const endRangePercent = ((endHandle.offsetLeft + correction) / availableSpace) * 100;

      const selectedRange = endHandle.offsetLeft - startHandle.offsetLeft;
      const selectedRangePercent = (selectedRange / availableSpace) * 100;

      this.value.start = startRangePercent;
      this.value.end = endRangePercent;
      this.value.total = selectedRangePercent;
    } else {
      const totalRangePercent = ((endHandle.offsetLeft + correction) / availableSpace) * 100;

      this.value.start = 0;
      this.value.end = totalRangePercent;
      this.value.total = totalRangePercent;
    }

    this.state.onChangeWatch(this.value);

  }

  handleClickOnTrack = (event) => {
    if (event.type === 'mousedown') {
      event.preventDefault();
    } else if (event.type === 'touchstart') {
      event = event.touches[0];
    }

    this.setOverlapping(false);

    const startHandle = this.state.refs.startHandle.current;
    const endHandle = this.state.refs.endHandle.current;

    const newPosition = event.clientX - (this.state.refs.track.current.offsetLeft + this.handle.correction);
    const newPositionPercent = (newPosition / this.track.availableSpace) * 100;

    if (this.state.type !== 'slider') {

      if (newPosition < startHandle.offsetLeft) {
        this.status.currentHandle = 'start';
        startHandle.style.left = `${newPositionPercent}%`;
      } else if (newPosition > endHandle.offsetLeft) {
        this.status.currentHandle = 'end';
        endHandle.style.left = `${newPositionPercent}%`;
      } else {
        const distanceFromStartHandle = Math.abs(newPosition - startHandle.offsetLeft);
        const distanceFromEndHandle = Math.abs(newPosition - endHandle.offsetLeft);

        if (distanceFromStartHandle < distanceFromEndHandle) {
          this.status.currentHandle = 'start';
          startHandle.style.left = `${newPositionPercent}%`;
        } else {
          this.status.currentHandle = 'end';
          endHandle.style.left = `${newPositionPercent}%`;
        }
      }

    } else {

      this.status.currentHandle = 'end';
      endHandle.style.left = `${newPositionPercent}%`;

    }

    this.init();

    this.updateActiveTrack();

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
          <div
            ref={this.state.refs.track}
            className="RangeBar"
            data-isoverlapped={this.state.status.isOverlapped}
            onMouseDown={this.handleDragStart}
            onTouchStart={this.handleDragStart}
          >
            <div
              ref={this.state.refs.activeTrack}
              className="RangeBar__track"
            />
            {
              this.state.type !== 'slider'
                ? (
                  <div
                    ref={this.state.refs.startHandle}
                    className="RangeBar__handle RangeBar__handle--start"
                  >
                    <div className="RangeBar__handle__icon" />
                    <div
                      className="RangeBar__handle__event-target"
                      data-handle-identifier="start"
                      onMouseDown={this.handleDragStart}
                      onTouchStart={this.handleDragStart}
                    />
                  </div>
                ) : null
            }
            <div
              ref={this.state.refs.endHandle}
              className="RangeBar__handle RangeBar__handle--end"
            >
              <div className="RangeBar__handle__icon" />
              <div
                className="RangeBar__handle__event-target"
                data-handle-identifier="end"
                onMouseDown={this.handleDragStart}
                onTouchStart={this.handleDragStart}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Range;
