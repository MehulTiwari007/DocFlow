package com.mehul.docflow.dto;

public class CommentRequest {

    private Long documentId;
    private String text;

    public CommentRequest() {
    }

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}