package com.mehul.docflow.dto;

public class DocumentResponse {

    private Long id;
    private String title;
    private String content;
    private boolean canEdit;

    public DocumentResponse() {
    }

    public DocumentResponse(Long id, String title, String content, boolean canEdit) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.canEdit = canEdit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public boolean isCanEdit() {
        return canEdit;
    }

    public void setCanEdit(boolean canEdit) {
        this.canEdit = canEdit;
    }
}