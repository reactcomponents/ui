import React, { Component } from 'react';
import './ScrollBar.css';

class ScrollBar extends Component {
  constructor(props) {
    super(props);
    this.isMouseDown = false;
    this.isClicked = false;

    this.startClientY = 0;
    this.startThumbTop = 0;
    this.startScrollTop = 0;
    this.newTop = 0;

    this.scrollbar = null;
    this.overflow = null;
    this.thumb = null;

    this.state = {
      thumbStyle: {
        top: 0,
        height: 0,
      },
      refs: {
        scrollbar: React.createRef(),
        track: React.createRef(),
        thumb: React.createRef(),
      },
    };
  }

  componentDidMount() {
    this.scrollbar = this.state.refs.scrollbar.current;
    this.thumb = this.state.refs.thumb.current;
    this.overflow = this.scrollbar.parentElement.querySelector('[data-scrollbar-element="overflow"]');
    this.thumb.style.height = `${(this.overflow.clientHeight / this.overflow.scrollHeight) * 100}%`;

    this.overflow.addEventListener('scroll', this.handleScroll);
  }

  startScroll = (event) => {
    if (event.type === 'mousedown') {
      event.preventDefault();
    } else if (event.type === 'touchstart') {
      event = event.touches[0];
    }

    this.isMouseDown = true;
    this.startClientY = event.clientY;
    this.startThumbTop = this.thumb.offsetTop;
    this.startScrollTop = this.overflow.scrollTop;

    window.addEventListener('mousemove', this.scroll);
    window.addEventListener('mouseup', this.endScroll);

    window.addEventListener('touchmove', this.scroll);
    window.addEventListener('touchend', this.endScroll);
  }

  endScroll = (event) => {
    event.preventDefault();
    this.isMouseDown = false;
    this.startClientY = 0;

    window.removeEventListener('mousemove', this.scroll);
    window.removeEventListener('mouseup', this.endScroll);

    window.removeEventListener('touchmove', this.scroll);
    window.removeEventListener('touchend', this.endScroll);

    this.setState({
      thumbStyle: {
        ...this.state.thumbStyle,
        top: this.newTop,
      },
    });
  }

  scroll = (event) => {
    if (event.type === 'mousemove') {
      event.preventDefault();
    } else if (event.type === 'touchmove') {
      event = event.touches[0];
    }

    const delta = this.startThumbTop + (event.clientY - this.startClientY);

    this.moveThumb(delta);
  }

  handleScroll = () => {
    const availableScroll = this.overflow.scrollHeight - this.overflow.clientHeight;
    const availableThumb = this.scrollbar.clientHeight - this.thumb.clientHeight;
    const newThumbPos = (this.overflow.scrollTop / availableScroll) * availableThumb;

    this.moveThumb(newThumbPos, false);
  }

  handleClick = (event) => {
    if (event.type === 'mousedown') {
      event.preventDefault();
    } else if (event.type === 'touchstart') {
      event = event.touches[0];
    }

    this.startThumbTop = this.thumb.offsetTop;
    this.startScrollTop = this.overflow.scrollTop;

    const clickY = event.clientY - this.scrollbar.getBoundingClientRect().top;
    const newThumbPos = clickY - (this.thumb.clientHeight / 2);

    this.smoothScroll(newThumbPos);
  }

  moveThumb = (position, isContentScrollEnabled = true) => {
    const posMin = 0;
    const posMax = this.scrollbar.clientHeight - this.thumb.clientHeight;

    this.newTop = (position <= posMin) ? posMin : position;
    this.newTop = (position > posMax) ? posMax : this.newTop;

    this.thumb.style.top = `${this.newTop}px`;

    if (isContentScrollEnabled) {
      this.scrollContent(this.newTop);
    }
  }

  scrollContent = (position) => {
    const availableScroll = this.overflow.scrollHeight - this.overflow.clientHeight;
    const availableThumb = this.scrollbar.clientHeight - this.thumb.clientHeight;

    const newScrollPosition = (position / availableThumb) * availableScroll;
    this.overflow.scrollTop = newScrollPosition;
  }

  smoothScroll = (position) => {
    const availableScroll = this.overflow.scrollHeight - this.overflow.clientHeight;
    const availableThumb = this.scrollbar.clientHeight - this.thumb.clientHeight;

    const newScrollPosition = Math.ceil((position / availableThumb) * availableScroll);

    let startTime = null;
    const timeTotal = 500;

    const move = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const timeElapsed = Math.floor(timestamp - startTime);
      const timeRemaining = Math.floor(timeTotal - timeElapsed);

      const currentPosition = this.overflow.scrollTop;
      const targetPosition = newScrollPosition;
      const distance = currentPosition - targetPosition;
      const direction = position < this.startThumbTop ? 'Top' : 'Bottom';
      const changeRate = Math.ceil(Math.abs(distance) / (timeTotal / 100));

      if (timeRemaining > 0) {

        if (direction === 'Top') {
          if (currentPosition > targetPosition) {
            this.overflow.scrollTop -= changeRate;
          }
        } else if (direction === 'Bottom') {
          if (currentPosition < targetPosition) {
            this.overflow.scrollTop += changeRate;
          }
        }

        window.requestAnimationFrame(move);
      }

    };

    window.requestAnimationFrame(move);

  }

  render() {
    return (
      <div ref={this.state.refs.scrollbar} className="ScrollBar">
        <div
          ref={this.state.refs.track}
          className="ScrollBar__track"
          onMouseDown={this.handleClick}
          onTouchStart={this.handleClick}
        />
        <div
          ref={this.state.refs.thumb}
          className="ScrollBar__thumb"
          style={{
            top: this.state.thumbStyle.top,
            height: this.state.thumbStyle.height,
          }}
          onMouseDown={this.startScroll}
          onTouchStart={this.startScroll}
        />
      </div>
    );
  }

}

export default ScrollBar;
