import React, { useState } from 'react';
import { Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { Checkbox } from '@chakra-ui/checkbox';
import { IconButton } from '@chakra-ui/button';
import { ChevronDownIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Collapse } from '@chakra-ui/transition';
import dayjs from 'dayjs';

interface Props {
  title: string;
  description?: string | null;
  completed: boolean;
  createdAt: string;
  onEdit: () => void;
  onDelete: () => void;
  toggleComplete: () => void;
}

const ToDo: React.FC<Props> = ({
  title,
  description,
  completed,
  createdAt,
  onEdit,
  onDelete,
  toggleComplete,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <Flex bgColor="white" m={2} py={4} px={6} boxShadow="lg" borderRadius={12} align="flex-start">
      <Checkbox isChecked={completed} onChange={toggleComplete} mt={2} mr={6} size="lg" />
      <Stack flex={1}>
        <Heading as="h2" fontSize="2xl" textDecoration={completed ? 'line-through' : 'none'}>
          {title}
        </Heading>
        {!isDetailsOpen && (
          <Text isTruncated noOfLines={1} whiteSpace="normal" opacity="0.6">
            {description}
          </Text>
        )}
        <Collapse in={isDetailsOpen}>
          <Text opacity="0.6">{description}</Text>
          <Flex justify="space-between" mt={4} align="center">
            <Text opacity="0.6" as="i" fontSize="sm">
              {dayjs(createdAt).format('DD/MM/YYYY')}
            </Text>
            <Flex>
              <IconButton
                variant="ghost"
                borderRadius="50%"
                icon={<EditIcon />}
                aria-label="Edit To Do"
                onClick={onEdit}
                data-testid="edit"
              />
              <IconButton
                variant="ghost"
                colorScheme="red"
                borderRadius="50%"
                icon={<DeleteIcon />}
                aria-label="Delete To Do"
                onClick={onDelete}
                data-testid="delete"
              />
            </Flex>
          </Flex>
        </Collapse>
      </Stack>
      <IconButton
        variant="ghost"
        icon={
          <ChevronDownIcon
            transition="transform 0.3s ease"
            transform={`rotate(${isDetailsOpen ? 180 : 0}deg)`}
          />
        }
        aria-label="To Do details"
        onClick={() => {
          setIsDetailsOpen(!isDetailsOpen);
        }}
        borderRadius="50%"
      />
    </Flex>
  );
};

export default ToDo;
