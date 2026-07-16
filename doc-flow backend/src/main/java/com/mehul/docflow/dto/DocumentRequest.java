package com.mehul.docflow.dto;
public class DocumentRequest {

    private Long documentId;
    private String title;
    private String content;
    private String email;

    public DocumentRequest() {
    }

    public DocumentRequest(Long documentId, String title, String content, String email) {
        this.documentId = documentId;
        this.title = title;
        this.content = content;
        this.email = email;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}