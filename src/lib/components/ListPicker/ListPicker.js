import React, { Component } from 'react';
import './ListPicker.css';
import ScrollBar from '../ScrollBar/ScrollBar';

class ListPicker extends Component {
  constructor(props) {
    super(props);
    this.overflow = null;
    this.list = null;
    this.label = null;

    this.lastScroll = null;

    this.state = {
      list: props.list || [],
      align: props.align || 'left',
      label: props.label || null,
      labelVisibility: true,
      selectedIndex: 0,
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
    window.addEventListener('mouseup', this.handleScrollEnd);
    window.addEventListener('touchend', this.handleScrollEnd);
  }

  handleScroll = () => {
    const { scrollTop } = this.overflow;

    if (scrollTop > 0) {
      this.label.setAttribute('data-isvisible', false);
    } else {
      this.label.setAttribute('data-isvisible', true);
    }

    const selectedItem = this.list.querySelector('.ListPicker__list__item[data-isselected="true"]');
    if (selectedItem) {
      selectedItem.setAttribute('data-isselected', 'false');
    }

    if (this.lastScroll !== null) {

      setTimeout(() => {

        const scrollTime = new Date().getTime();

        if (scrollTime - this.lastScroll >= 250) {
          this.handleScrollEnd();
        }

      }, 250);

    }

    this.lastScroll = new Date().getTime();

  }

  handleScrollEnd = () => {
    this.label.setAttribute('data-isvisible', true);

    const { scrollTop } = this.overflow;

    const height = 50;

    const position = (scrollTop % height) > (height / 2) ? Math.ceil(scrollTop / height) : Math.floor(scrollTop / height);

    this.list.style.top = `${this.overflow.scrollTop - (height * position)}px`;

    const selectedItem = this.list.querySelectorAll('.ListPicker__list__item')[position];
    if (selectedItem) {
      selectedItem.setAttribute('data-isselected', 'true');
    }

    this.setState({
      selectedIndex: position,
      listTop: `${this.overflow.scrollTop - (height * position)}px`,
    });

  }

  render() {
    return (
      <div className="ListPicker">
        <div className="ListPicker__gradient-overlay ListPicker__gradient-overlay--top" />
        <div className="ListPicker__gradient-overlay ListPicker__gradient-overlay--bottom" />

        <div
          ref={this.state.refs.label}
          className="ListPicker__list__label"
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
          <div
            ref={this.state.refs.list}
            className="ListPicker__list"
            style={{
              top: this.state.listTop,
            }}
          >
            {
              this.state.list.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="ListPicker__list__item"
                    data-isselected={this.state.selectedIndex === index}
                    style={{
                      textAlign: this.state.align,
                    }}
                  >
                    <div className="ListPicker__list__item__text">{ item }</div>
                  </div>
                );
              })
            }
          </div>
        </div>

        <ScrollBar
          onScrollEnd={() => {
            console.log('Scroll Ended');
          }}
        />
      </div>
    );
  }

}

export default ListPicker;
