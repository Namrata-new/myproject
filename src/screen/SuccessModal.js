import React from 'react'
import { NativeBaseProvider, Box ,Input,Modal,FormControl,Button} from "native-base";
const SuccessModal = (props) => {
  return (
   <NativeBaseProvider>
    <Modal isOpen={props.visible} onClose={() => console.log(props.visible)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            Heloo
          </Modal.Body>
          <Modal.Footer>
          <Button onPress={() => {
              setShowModal(false);
            }}>
                Save
              </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  )
}

export default SuccessModal;
