package com.example.demo.dto;

public class ActiveUserMessage {

    private Long documentId;
    private String email;

    public ActiveUserMessage() {
    }

    public ActiveUserMessage(Long documentId, String email) {
        this.documentId = documentId;
        this.email = email;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}