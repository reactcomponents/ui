import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ListPicker.css';

class ListPicker extends Component {
  constructor(props) {
    super(props);
    this.overflow = null;
    this.list = null;

    this.isSmoothScrolling = false;
    this.lastScroll = null;
    this.height = 50;

    this.lastPosition = null;
    this.position = props.list.findIndex(value => value === props.defaultValue);

    this.state = {
      list: props.list,
      selectedIndex: this.position,
      refs: {
        overflow: React.createRef(),
        list: React.createRef(),
      },
    };
  }

  componentDidMount() {
    const { refs } = this.state;

    this.overflow = refs.overflow.current;
    this.list = refs.list.current;

    this.overflow.addEventListener('scroll', this.handleScroll);

    // Initial Scroll Position based on DefaultValue
    this.overflow.scrollTop = this.position * this.height;
  }

  smoothScroll = (target, duration) => {
    this.isSmoothScrolling = true;

    const ticks = (duration / 1000) * 60;
    const jump = Math.ceil(Math.abs(this.overflow.scrollTop - target) / ticks);

    let start = null;

    const scroll = (timestamp) => {
      if (!start) {
        start = timestamp;
      }

      const { scrollTop } = this.overflow;
      const timePassed = timestamp - start;

      const factor = (Math.abs(scrollTop - target) < jump) ? Math.abs(scrollTop - target) : jump;

      if (scrollTop < target) {
        this.overflow.scrollTop = this.overflow.scrollTop + factor;
      } else if (scrollTop > target) {
        this.overflow.scrollTop = this.overflow.scrollTop - factor;
      }

      if (scrollTop === target && timePassed > duration) {
        this.isSmoothScrolling = false;
        this.handleScroll();
      } else {
        window.requestAnimationFrame(scroll);
      }
    };

    window.requestAnimationFrame(scroll);
  }

  handleScroll = () => {
    if (!this.isSmoothScrolling) {

      const { scrollTop } = this.overflow;

      const prevItem = Math.floor(scrollTop / this.height);
      const nextItem = Math.ceil(scrollTop / this.height);
      const isAboveMiddle = (scrollTop % this.height) > (this.height / 2) + 5;
      this.position = isAboveMiddle ? nextItem : prevItem;

      const index = this.position;
      const value = this.state.list[index];

      const previousItem = this.list.querySelector('.ListPicker__list__item[data-isselected="true"]');
      if (previousItem) previousItem.setAttribute('data-isselected', 'false');

      const currentItem = this.list.querySelectorAll('.ListPicker__list__item')[index];
      if (currentItem) currentItem.setAttribute('data-isselected', 'true');

      this.list.style.top = `${scrollTop - (this.height * this.position)}px`;

      if (this.position !== this.lastPosition) {
        this.lastPosition = this.position;
        this.props.onChange(value, index);
      }

    }
  }

  render() {
    const { label } = this.props;
    const {
      selectedIndex,
      refs,
    } = this.state;

    const hasLabel = label.trim() !== '';

    return (
      <div className="ListPicker" data-haslabel={hasLabel}>
        <div className="ListPicker__gradient-overlay ListPicker__gradient-overlay--top" />
        <div className="ListPicker__gradient-overlay ListPicker__gradient-overlay--bottom" />

        <div className="ListPicker__selection">
          <div className="box" />
        </div>

        <div ref={refs.overflow} className="ListPicker__overflow">
          <div className="ListPicker__padding" />
          <div ref={refs.list} className="ListPicker__list">
            {
              this.state.list.map((item, index) => {
                const key = `${item}_${index}`;
                const isSelectedItem = index === selectedIndex;

                return (
                  <div
                    key={key}
                    className="ListPicker__list__item"
                    data-isselected={isSelectedItem}
                  >
                    <div className="label">{ label }</div>
                    <div className="text">{ item }</div>
                  </div>
                );
              })
            }
          </div>
          <div className="ListPicker__padding" />
        </div>
      </div>
    );
  }

}

ListPicker.propTypes = {
  label: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

ListPicker.defaultProps = {
  label: '',
  list: [],
  defaultValue: '',
  onChange: () => {},
};

export default ListPicker;
