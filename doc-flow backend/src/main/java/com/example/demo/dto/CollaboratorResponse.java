package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CollaboratorResponse {

    private Long id;

    private String userName;

    private String email;

    private String permission;
}