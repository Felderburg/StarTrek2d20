import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from 'react-bootstrap/Modal';
import { CloseButton } from 'react-bootstrap';

interface IModalProperties {
  size?: 'xl' | 'lg' | 'sm';
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  header: string;
}

export const ModalBox: React.FC<IModalProperties> = ({
  size,
  show,
  onClose,
  children,
  header,
}) => {
  return (
    <Modal show={show} size={size}>
      <Modal.Header className="pt-3 border-bottom-0">
        <h5>{header}</h5>
        <CloseButton onClick={() => onClose()} variant="white" />
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

class ModalDialogControl {
  static rootElement;

  size?: 'xl' | 'lg' | 'sm';
  onClose?: () => void;
  children?: React.ReactNode;
  header: string;

  static get root() {
    if (ModalDialogControl.rootElement == null) {
      ModalDialogControl.rootElement = createRoot(
        document.getElementById('dialog'),
      );
    }
    return ModalDialogControl.rootElement;
  }

  show(
    size?: 'xl' | 'lg' | 'sm',
    onClose?: () => void,
    children?: React.ReactNode,
    header?: string,
  ) {
    this.size = size;
    this.onClose = onClose;
    this.children = children;
    this.header = header ? header : 'Select';
    this.render(true);
  }

  hide() {
    this.render(false);
  }

  private render(visible: boolean) {
    if (visible) {
      ModalDialogControl.root.render(
        React.createElement(ModalBox, {
          show: visible,
          onClose: () => {
            ModalControl.hide();
            if (this.onClose) this.onClose();
          },
          size: this.size,
          children: this.children,
          header: this.header,
        }),
      );
    } else {
      ModalDialogControl.root.unmount();
      ModalDialogControl.rootElement = null;
    }
  }
}
export const ModalControl = new ModalDialogControl();
