package com.mehul.docflow.service;

import com.mehul.docflow.dto.ShareDocumentRequest;
import com.mehul.docflow.entity.Document;
import com.mehul.docflow.entity.DocumentAccess;
import com.mehul.docflow.entity.User;
import com.mehul.docflow.repository.DocumentAccessRepository;
import com.mehul.docflow.repository.DocumentRepository;
import com.mehul.docflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocumentAccessService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DocumentAccessRepository documentAccessRepository;

    // Share Document
    public String shareDocument(ShareDocumentRequest request, String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail);

        Document document = documentRepository
                .findById(request.getDocumentId())
                .orElse(null);

        if (document == null) {
            return "Document Not Found";
        }

        // Only owner can share
        if (!document.getOwner().getId().equals(owner.getId())) {
            return "Access Denied";


        }

        User sharedUser = userRepository.findByEmail(request.getEmail());

        if (sharedUser == null) {
            return "User Not Found";
        }

        if (documentAccessRepository
                .findByDocumentAndUser(document, sharedUser)
                .isPresent()) {

            return "User Already Has Access";
        }

        DocumentAccess access = new DocumentAccess();

        access.setDocument(document);
        access.setUser(sharedUser);
        access.setPermission(request.getPermission());

        documentAccessRepository.save(access);

        return "Document Shared Successfully";
    }

    // Check Edit Permission
    public boolean canEdit(Document document, User user) {

        // Owner can always edit
        if (document.getOwner().getId().equals(user.getId())) {
            return true;
        }

        return documentAccessRepository
                .findByDocumentAndUser(document, user)
                .map(access -> access.getPermission().equals("EDITOR"))
                .orElse(false);
    }
}