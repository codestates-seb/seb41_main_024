import { Box, Modal } from '@mui/material';
import React, { useState } from 'react';
import FormButton from '../../molecules/formbutton/FormButton';
const MODAL_STYLE = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  maxWidth: '400px',
};
interface modalComponentPropsType {
  modalOpen: boolean;
  handleClose: () => void;
  title: string;
  onClick: () => void;
  positiveResponse: string;
  negativeResponse: string;
  positiveColor: string;
  negativeColor: string;
}

const ModalComponent = ({
  modalOpen,
  handleClose,
  title,
  onClick,
  positiveResponse,
  negativeResponse,
  positiveColor,
  negativeColor,
}: modalComponentPropsType) => {
  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={MODAL_STYLE}>
        {title}
        <div className="mt-3">
          <FormButton
            variant="contained"
            className={`bg-[${positiveColor}] text-[white] ml-[10px] h-[30px]`}
            content={positiveResponse}
            onClick={onClick}
          ></FormButton>
          <FormButton
            variant="contained"
            className={`bg-[${negativeColor}] text-[white] ml-[10px] h-[30px]`}
            content={negativeResponse}
            onClick={handleClose}
          ></FormButton>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
