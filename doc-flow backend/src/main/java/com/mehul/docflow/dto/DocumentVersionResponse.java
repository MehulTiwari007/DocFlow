package com.mehul.docflow.dto;

import java.time.LocalDateTime;

public class DocumentVersionResponse {

    private Long id;
    private String title;
    private LocalDateTime createdAt;

    public DocumentVersionResponse(Long id,
                                   String title,
                                   LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}