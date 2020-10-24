import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
interface ModalProps{
    buttonDiabled:boolean;
    IsOpen:boolean;
    saveEvent:()=>void;
    toggle:()=>void;
    title:string;
    body:JSX.Element;
    children?:JSX.Element[];
}
const ModalPopup = (props: ModalProps) => {
  const {
    IsOpen,
    buttonDiabled
  } = props;
  
  const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={props.toggle}>&times;</button>;
  return (
    <div>
      <Modal isOpen={IsOpen} toggle={props.toggle}  external={externalCloseBtn}>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalBody>
          {props.body}
        </ModalBody>
        <ModalFooter>
          <Button id="m_create" data-testid="m_create" disabled={buttonDiabled} color="primary" onClick={props.saveEvent}>Create Task</Button>
          <Button id="m_cancle" data-testid="m_cancle" color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalPopup;