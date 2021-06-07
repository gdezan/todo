import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/modal';
import { Button } from '@chakra-ui/button';

interface Props {
  title: string;
  subtitle: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const ConfirmationDialog: React.FC<Props> = ({
  title,
  subtitle,
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}) => {
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{subtitle}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="red" ml={3} onClick={onConfirm} isLoading={isLoading}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
