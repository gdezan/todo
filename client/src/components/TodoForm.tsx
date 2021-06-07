import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Textarea } from '@chakra-ui/textarea';

import { ToDoType } from '../types';

interface Props {
  todo?: ToDoType | null;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: ({ title, description }: Partial<ToDoType>) => void;
}

const TodoForm: React.FC<Props> = ({ todo, onClose, isOpen, onConfirm, isLoading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(todo?.title ?? '');
    setDescription(todo?.description ?? '');
  }, [todo]);

  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm({ title, description });
          }}
        >
          <ModalHeader>{`${todo ? 'Edit' : 'Create'} To Do`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="The title of your task"
              />
            </FormControl>
            <FormControl id="description" mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                rows={3}
                placeholder="Some extra details for you task"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={isLoading}>
              Confirm
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TodoForm;
