import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    const options = props.options || {};
    this.state = {
      type: options.type || 'DEFAULT',
      title: options.title || null,
      align: options.align || 'TOP',
      content: props.content || null,
      isVisible: props.isVisible || false,
      color: {
        header: 'blue',
        bg: 'rgba(0, 0, 0, 0.5)',
      },
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      isVisible: props.isVisible,
    });
  }

  hideModal = () => {
    this.setState({
      isVisible: false,
    });
  }

  render() {
    return (
      <div
        className="Modal"
        data-visible={this.state.isVisible}
        data-type={this.state.type}
        data-align={this.state.align}
      >
        <div
          className="Modal__bg"
          style={{ backgroundColor: this.state.color.bg }}
          onClick={this.hideModal}
        />
        <div className="Modal__content">
          <div className="Modal__content__box">
            {
              (this.state.title)
                ? (
                  <div className="Modal__header">
                    <div className="Modal__header__title">{this.state.title}</div>
                    <div className="Modal__close-button unselectable" onClick={this.hideModal}>
                      <div className="icon">
                        <div className="line" />
                        <div className="line" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="Modal__header-dupe">
                    <div className="Modal__close-button unselectable" onClick={this.hideModal}>
                      <div className="icon">
                        <div className="line" />
                        <div className="line" />
                      </div>
                    </div>
                  </div>
                )
            }
            { this.state.content }
          </div>
        </div>
      </div>
    );
  }

}

export default Modal;
