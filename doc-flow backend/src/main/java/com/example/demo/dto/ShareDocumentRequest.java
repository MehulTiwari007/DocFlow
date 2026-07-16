package com.example.demo.dto;

public class ShareDocumentRequest {

    private Long documentId;
    private String email;
    private String permission;

    public ShareDocumentRequest() {
    }

    public ShareDocumentRequest(Long documentId, String email, String permission) {
        this.documentId = documentId;
        this.email = email;
        this.permission = permission;
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

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }
}