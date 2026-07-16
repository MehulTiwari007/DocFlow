package com.example.demo.dto;

import java.time.LocalDateTime;

public class CommentResponse {

    private Long id;
    private String userName;
    private String text;
    private LocalDateTime createdAt;
    private String status;

    public CommentResponse(Long id,
                           String userName,
                           String text,
                           LocalDateTime createdAt,
                           String status) {

        this.id = id;
        this.userName = userName;
        this.text = text;
        this.createdAt = createdAt;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getText() {
        return text;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getStatus() {
        return status;
    }
}