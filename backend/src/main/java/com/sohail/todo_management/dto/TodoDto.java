package com.sohail.todo_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TodoDto {
    private long id;
    private String title;
    private String description;
    private boolean completed;
}
