package com.sohail.todo_management.service.impl;

import com.sohail.todo_management.dto.TodoDto;
import com.sohail.todo_management.entity.Todo;
import com.sohail.todo_management.exception.ResourceNotFoundException;
import com.sohail.todo_management.repository.TodoRepository;
import com.sohail.todo_management.service.TodoService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;
    private ModelMapper modelMapper;

    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        Todo todo=modelMapper.map(todoDto,Todo.class);
        Todo savedTodo=todoRepository.save(todo);
        return modelMapper.map(savedTodo,TodoDto.class);
    }

    @Override
    public TodoDto getTodo(Long id) {
        Todo todo= todoRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Todo not found"));
        return modelMapper.map(todo,TodoDto.class);
    }

    @Override
    public List<TodoDto> getAllTodos() {
        List<Todo> todos= todoRepository.findAll();
        return todos.stream().map((todo)->modelMapper.map(todo,TodoDto.class)).collect(Collectors.toList());
    }

    @Override
    public TodoDto updateTodo(TodoDto todoDto, Long id) {
        Todo todo=todoRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("TODO not found"));
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());
        Todo updatedTodo= todoRepository.save(todo);
        return modelMapper.map(updatedTodo,TodoDto.class);
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo=todoRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Not found"));
        todoRepository.deleteById(id);
    }

    @Override
    public TodoDto completeTodo(Long id) {
        Todo todo=todoRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Not found"));
        todo.setCompleted(Boolean.TRUE);
        Todo updatedTodo= todoRepository.save(todo);
        return modelMapper.map(updatedTodo,TodoDto.class);
    }

    @Override
    public TodoDto inCompleteTodo(Long id) {
        Todo todo=todoRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Not found"));
        todo.setCompleted(Boolean.FALSE);
        Todo updatedTodo= todoRepository.save(todo);
        return modelMapper.map(updatedTodo,TodoDto.class);
    }
}
