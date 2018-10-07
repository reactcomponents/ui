import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal, destroyModal } from '../../actions';

class ModalInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      type: 'DEFAULT',
      title: null,
      content: null,
      align: 'TOP',
      isVisible: false,
      color: {
        header: 'blue',
        bg: 'rgba(0, 0, 0, 0.5)',
      },
    };
  }

  componentWillMount() {
    const modal = this.props.modals[this.state.id];
    this.setState({
      type: modal.options.type,
      align: modal.options.align || 'TOP',
      title: modal.options.title || null,
      content: modal.content || null,
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isVisible: true,
      });
    }, 10);
  }

  componentWillReceiveProps(props) {
    const modal = props.modals[this.state.id];
    this.setState({
      isVisible: modal.isVisible,
    });
    if (!modal.isVisible) {
      setTimeout(() => {
        this.props.destroyModal(this.state.id);
      }, 500);
    }
  }

  hideModal = () => {
    this.props.hideModal(this.state.id);
  }

  render() {
    const {
      isVisible,
      type,
      content,
      title,
      color,
      align,
    } = this.state;

    return (
      <div
        className="Modal"
        data-visible={isVisible}
        data-type={type}
        data-align={align}
      >
        <div className="Modal__bg" style={{ backgroundColor: color.bg }} onClick={this.hideModal} />
        <div className="Modal__content">
          <div className="Modal__content__box">
            {
              (title)
                ? (
                  <div className="Modal__header">
                    <div className="Modal__header__title">{title}</div>
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
            { content }
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state.modal;
};

const mapDispatchToProps = {
  showModal,
  hideModal,
  destroyModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalInstance);
