import React, { Component } from 'react';
import './ListPicker.css';

class ListPicker extends Component {
  constructor(props) {
    super(props);
    this.overflow = null;
    this.list = null;
    this.label = null;

    this.lastScroll = null;
    this.height = 50;

    this.position = 0;

    this.state = {
      list: props.list || [],
      align: props.align || 'left',
      label: props.label || null,
      labelVisibility: true,
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
    this.overflow = this.state.refs.overflow.current;
    this.list = this.state.refs.list.current;
    this.label = this.state.refs.label.current;

    this.overflow.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { scrollTop } = this.overflow;

    const prevItem = Math.floor(scrollTop / this.height);
    const nextItem = Math.ceil(scrollTop / this.height);
    const isAboveMiddle = (scrollTop % this.height) > (this.height / 2) - 5;
    this.position = isAboveMiddle ? nextItem : prevItem;

    this.label.setAttribute('data-isvisible', false);

    let selectedItem = this.list.querySelector('.ListPicker__list__item[data-isselected="true"]');
    if (selectedItem) {
      selectedItem.setAttribute('data-isselected', 'false');
    }

    selectedItem = this.list.querySelectorAll('.ListPicker__list__item')[this.position];
    if (selectedItem) {
      selectedItem.setAttribute('data-isselected', 'true');
    }

    if (this.lastScroll !== null) {
      setTimeout(() => {
        const scrollTime = new Date().getTime();

        if (scrollTime - this.lastScroll >= 100) {
          this.handleScrollEnd();
        }
      }, 100);
    }

    this.lastScroll = new Date().getTime();
  }

  handleScrollEnd = () => {
    this.label.setAttribute('data-isvisible', true);

    this.setState({
      selectedIndex: this.position,
      labelVisibility: true,
      listTop: `${this.overflow.scrollTop - (this.height * this.position)}px`,
    });
  }

  render() {
    return (
      <div className="ListPicker">
        <div className="ListPicker__gradient-overlay ListPicker__gradient-overlay--top" />
        <div className="ListPicker__gradient-overlay ListPicker__gradient-overlay--bottom" />

        <div
          ref={this.state.refs.label}
          className="ListPicker__label"
          data-isvisible={this.state.labelVisibility}
          style={{
            textAlign: this.state.align,
          }}
        >
          <div className="label">{ this.state.label }</div>
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
                return (
                  <div
                    key={key}
                    className="ListPicker__list__item"
                    data-isselected={index === this.state.selectedIndex}
                    style={{
                      textAlign: this.state.align,
                    }}
                  >
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
