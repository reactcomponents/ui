/**
 * Modal
 */

export const DESTROY_MODAL = 'DESTROY_MODAL';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const showModal = (content, modalId, options = {}) => {
  const defaultOptions = {
    type: 'DEFAULT',
    title: null,
  };

  const id = modalId || `modal_${new Date().getTime()}`;
  return {
    id,
    type: SHOW_MODAL,
    payload: {
      id,
      content,
      isVisible: true,
      options: {
        ...defaultOptions,
        ...options,
      },
    },
  };
};

export const hideModal = (modalId) => {
  return {
    type: HIDE_MODAL,
    payload: {
      id: modalId,
      isVisible: false,
    },
  };
};

export const destroyModal = (modalId) => {
  return {
    type: DESTROY_MODAL,
    payload: {
      id: modalId,
    },
  };
};
