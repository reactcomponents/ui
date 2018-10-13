import React, { Component } from 'react';
import './ListPicker.css';

class ListPicker extends Component {
  constructor(props) {
    super(props);
    this.overflow = null;
    this.list = null;
    this.label = null;

    this.isSmoothScrolling = false;
    this.lastScroll = null;
    this.height = 50;

    const list = props.list || [];

    this.defaultValue = (props.defaultValue !== undefined) ? props.defaultValue : null;
    this.position = list.findIndex(value => value === this.defaultValue);

    this.onChange = props.onChange;

    this.state = {
      list,
      label: props.label || null,
      selectedIndex: this.position,
      listTop: 0,
      refs: {
        overflow: React.createRef(),
        list: React.createRef(),
        label: React.createRef(),
      },
    };
  }

  componentDidMount() {
    const { refs } = this.state;

    this.overflow = refs.overflow.current;
    this.list = refs.list.current;
    this.label = refs.label.current;

    this.overflow.addEventListener('scroll', this.handleScroll);

    setTimeout(() => {
      this.smoothScroll(this.position * this.height, 1000);
    }, 3000);
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
    if (this.isSmoothScrolling) {
      return undefined;
    }

    const { scrollTop } = this.overflow;

    const prevItem = Math.floor(scrollTop / this.height);
    const nextItem = Math.ceil(scrollTop / this.height);
    const isAboveMiddle = (scrollTop % this.height) > (this.height / 2);
    this.position = isAboveMiddle ? nextItem : prevItem;

    if (typeof this.onChange === 'function') {
      this.onChange(this.state.list[this.position], this.position);
    }

    const selectedItem = this.list.querySelector('.ListPicker__list__item[data-isselected="true"]');
    if (selectedItem) {
      selectedItem.setAttribute('data-isselected', 'false');
    }

    this.list.style.top = `${this.overflow.scrollTop - (this.height * this.position)}px`;

    if (this.lastScroll !== null) {
      setTimeout(() => {
        const scrollTime = new Date().getTime();

        if (scrollTime - this.lastScroll >= 100) {
          this.handleScrollEnd();
        }
      }, 100);
    } else {
      if (selectedItem) {
        selectedItem.setAttribute('data-isselected', 'true');
      }
    }

    this.lastScroll = new Date().getTime();
  }

  handleScrollEnd = () => {
    if (typeof this.onChange === 'function') {
      this.onChange(this.state.list[this.position], this.position);
    }

    const selectedItem = this.list.querySelectorAll('.ListPicker__list__item')[this.position];
    if (selectedItem) {
      selectedItem.setAttribute('data-isselected', 'true');
    }

    // this.setState({
    //   selectedIndex: this.position,
    //   listTop: `${this.overflow.scrollTop - (this.height * this.position)}px`,
    // });
  }

  render() {
    return (
      <div className="ListPicker">
        <div className="ListPicker__gradient-overlay ListPicker__gradient-overlay--top" />
        <div className="ListPicker__gradient-overlay ListPicker__gradient-overlay--bottom" />

        <div className="ListPicker__selection">
          <div className="box" />
        </div>

        <div
          ref={this.state.refs.overflow}
          className="ListPicker__overflow"
          data-scrollbar-element="overflow"
        >
          <div className="ListPicker__padding" />
          <div
            ref={this.state.refs.list}
            className="ListPicker__list"
            style={{
              top: this.state.listTop,
            }}
          >
            {
              this.state.list.map((item, index) => {
                const key = `${item}_${index}`;
                const isSelectedItem = index === this.state.selectedIndex;
                return (
                  <div
                    key={key}
                    className="ListPicker__list__item"
                    data-isselected={isSelectedItem}
                  >
                    {
                      this.state.label && (
                        <div className="label">
                          <div className="text">{ this.state.label }</div>
                        </div>
                      )
                    }
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

export default ListPicker;
