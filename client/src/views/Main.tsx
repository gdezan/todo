import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';

import { ToDoType } from '../types';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { deleteTodo, fetchTodos, updateTodo, createTodo } from '../reducers/todos';

import ToDo from '../components/ToDo';
import ConfirmationDialog from '../components/ConfirmationDialog';
import TodoForm from '../components/TodoForm';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const loading = useAppSelector((state) => state.todos.loading);

  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const onDelete = (todoId: number) => {
    setSelectedTodo(todoId);
    setIsDeleteDialogOpen(true);
  };

  const onEdit = (todoId: number) => {
    setSelectedTodo(todoId);
    setIsEditDialogOpen(true);
  };

  const onAdd = () => {
    setSelectedTodo(null);
    setIsEditDialogOpen(true);
  };

  return (
    <>
      <Flex justify="center" direction="column" align="center">
        <Heading as="h1" mt={[12, 16, 20]}>
          To Do List
        </Heading>
        <Box w={['95%', '80%', '60%', '40%']} py={12}>
          <Flex justify="flex-end">
            <Button variant="ghost" borderRadius={20} mb={2} leftIcon={<AddIcon />} onClick={onAdd}>
              Add a new To Do
            </Button>
          </Flex>
          {todos?.map(({ title, description, completed, createdAt, id }: ToDoType) => (
            <React.Fragment key={id}>
              <ToDo
                title={title}
                description={description}
                completed={completed}
                createdAt={createdAt}
                onDelete={() => onDelete(id)}
                onEdit={() => onEdit(id)}
                toggleComplete={() => dispatch(updateTodo({ id, completed: !completed }))}
              />
            </React.Fragment>
          ))}
        </Box>
      </Flex>
      <TodoForm
        todo={todos?.find((todo) => todo.id === selectedTodo) ?? null}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onConfirm={({ title, description }) => {
          setIsEditDialogOpen(false);
          if (selectedTodo) {
            dispatch(updateTodo({ id: selectedTodo, title, description }));
          } else {
            dispatch(createTodo({ title, description }));
          }
        }}
        isLoading={loading}
      />
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        isLoading={loading}
        title="Delete To Do?"
        subtitle="Are you sure you want to delete this To Do? This can not be undone"
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={async () => {
          if (selectedTodo) {
            await dispatch(deleteTodo(selectedTodo));
          }
          setIsDeleteDialogOpen(false);
        }}
      />
    </>
  );
};

export default Main;
