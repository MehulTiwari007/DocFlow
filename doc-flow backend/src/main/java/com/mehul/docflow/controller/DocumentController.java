package com.mehul.docflow.controller;

import com.mehul.docflow.dto.DocumentRequest;
import com.mehul.docflow.dto.DocumentResponse;
import com.mehul.docflow.entity.Document;
import com.mehul.docflow.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.mehul.docflow.entity.DocumentAccess;
import com.mehul.docflow.dto.CollaboratorResponse;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // Create Document
    @PostMapping
    public Long createDocument(@RequestBody DocumentRequest request,
                               Authentication authentication) {

        String email = authentication.getName();

        return documentService.createDocument(request, email);
    }
    // Get All Documents
    @GetMapping
    public List<Document> getAllDocuments(Authentication authentication) {

        String email = authentication.getName();

        return documentService.getAllDocuments(email);
    }

    // Get Document By Id
    @GetMapping("/{id}")
    public DocumentResponse getDocumentById(@PathVariable Long id,
                                            Authentication authentication) {

        String email = authentication.getName();

        return documentService.getDocumentById(id, email);
    }

    // Update Document
    @PutMapping("/{id}")
    public String updateDocument(@PathVariable Long id,
                                 @RequestBody DocumentRequest request,
                                 Authentication authentication) {

        String email = authentication.getName();

        return documentService.updateDocument(id, request, email);
    }

    // Delete Document
    @DeleteMapping("/{id}")
    public String deleteDocument(@PathVariable Long id,
                                 Authentication authentication) {

        String email = authentication.getName();

        return documentService.deleteDocument(id, email);
    }

    // Search Documents
    @GetMapping("/search")
    public List<Document> searchDocuments(@RequestParam String title) {

        return documentService.searchDocuments(title);
    }
    @GetMapping("/shared")
    public List<DocumentAccess> getSharedDocuments(Authentication authentication) {

        String email = authentication.getName();

        return documentService.getSharedDocuments(email);

    }
    @GetMapping("/{id}/users")
    public List<CollaboratorResponse> getCollaborators(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        return documentService.getCollaborators(id, email);
    }
    @DeleteMapping("/shared/{id}")
    public String removeSharedDocument(@PathVariable Long id,
                                       Authentication authentication) {

        String email = authentication.getName();

        return documentService.removeSharedDocument(id, email);
    }
    @DeleteMapping("/{documentId}/users/{userId}")
    public String removeCollaborator(
            @PathVariable Long documentId,
            @PathVariable Long userId,
            Authentication authentication) {

        return documentService.removeCollaborator(
                documentId,
                userId,
                authentication.getName());
    }

}