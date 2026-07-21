package com.mehul.docflow.service;

import com.mehul.docflow.dto.DocumentRequest;
import com.mehul.docflow.dto.DocumentResponse;
import com.mehul.docflow.entity.Document;
import com.mehul.docflow.entity.DocumentAccess;
import com.mehul.docflow.entity.User;
import com.mehul.docflow.repository.DocumentAccessRepository;
import com.mehul.docflow.repository.DocumentRepository;
import com.mehul.docflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import com.mehul.docflow.dto.CollaboratorResponse;
import java.util.ArrayList;
import jakarta.transaction.Transactional;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DocumentAccessRepository documentAccessRepository;

    @Autowired
    private DocumentAccessService documentAccessService;

    @Autowired
    private DocumentVersionService documentVersionService;

    // Create Document
    public Long createDocument(DocumentRequest request, String email) {

        User user = userRepository.findByEmail(email);

        Document document = new Document();

        document.setTitle(request.getTitle());
        document.setContent(request.getContent());
        document.setCreatedAt(LocalDateTime.now());
        document.setUpdatedAt(LocalDateTime.now());
        document.setOwner(user);

        documentRepository.save(document);

        return document.getId();
    }

    // Get All Documents
    public List<Document> getAllDocuments(String email) {

        User user = userRepository.findByEmail(email);

        return documentRepository.findByOwner(user);

    }

    // Get Document By Id
    public DocumentResponse getDocumentById(Long id, String email) {

        User user = userRepository.findByEmail(email);

        Document document = documentRepository
                .findById(id)
                .orElse(null);

        if (document == null) {
            return null;
        }

        boolean canEdit =
                documentAccessService.canEdit(document, user);

        return new DocumentResponse(
                document.getId(),
                document.getTitle(),
                document.getContent(),
                canEdit
        );
    }
    // Update Document
    public String updateDocument(Long id, DocumentRequest request, String email) {

        User user = userRepository.findByEmail(email);

        Document document = documentRepository
                .findById(id)
                .orElse(null);

        if (document == null) {
            return "Document Not Found";
        }

        if (!documentAccessService.canEdit(document, user)) {
            return "Access Denied";
        }

        document.setTitle(request.getTitle());
        document.setContent(request.getContent());
        document.setUpdatedAt(LocalDateTime.now());
        documentVersionService.saveVersion(document);
        documentRepository.save(document);

        return "Document Updated Successfully";
    }

    // Delete Document
    // Delete Document
    @Transactional
    public String deleteDocument(Long id, String email) {

        System.out.println("Delete Started");

        User user = userRepository.findByEmail(email);

        Document document = documentRepository
                .findById(id)
                .orElse(null);

        System.out.println("Document Found");

        if (document == null) {
            return "Document Not Found";
        }

        if (!document.getOwner().getId().equals(user.getId())) {
            return "Access Denied";
        }

        System.out.println("Deleting DocumentAccess");
        documentAccessRepository.deleteByDocument(document);

        System.out.println("Deleting Versions");
        documentVersionService.deleteVersions(document);

        System.out.println("Deleting Document");
        documentRepository.delete(document);

        System.out.println("Delete Completed");

        return "Document Deleted Successfully";
    }

    // Search Documents

        public List<Document> searchDocuments(String keyword) {

            return documentRepository
                    .findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(
                            keyword,
                            keyword
                    );

        }



    // Real-time Update
    public Document updateDocumentRealtime(DocumentRequest request) {

        Document document = documentRepository
                .findById(request.getDocumentId())
                .orElse(null);

        if (document == null) {
            return null;
        }

        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            return null;
        }

        if (!documentAccessService.canEdit(document, user)) {
            System.out.println("Access Denied : " + user.getEmail());
            return null;
        }

        document.setTitle(request.getTitle());
        document.setContent(request.getContent());
        document.setUpdatedAt(LocalDateTime.now());

        return documentRepository.save(document);
    }

    public List<DocumentAccess> getSharedDocuments(String email) {

        User user = userRepository.findByEmail(email);

        return documentAccessRepository.findByUser(user);

    }
    public String removeSharedDocument(Long documentId, String email) {

        User user = userRepository.findByEmail(email);

        Document document = documentRepository
                .findById(documentId)
                .orElse(null);

        if (document == null) {
            return "Document Not Found";
        }

        documentAccessRepository.deleteByDocumentAndUser(document, user);

        return "Document Removed Successfully";
    }
    public List<CollaboratorResponse> getCollaborators(Long documentId, String email) {

        User owner = userRepository.findByEmail(email);

        Document document = documentRepository.findById(documentId).orElse(null);

        if (document == null) {
            return List.of();
        }

        // Only owner can view collaborators
        if (!document.getOwner().getId().equals(owner.getId())) {
            return List.of();
        }

        List<DocumentAccess> accesses =
                documentAccessRepository.findByDocument(document);

        List<CollaboratorResponse> collaborators = new ArrayList<>();

        for (DocumentAccess access : accesses) {

            collaborators.add(

                    new CollaboratorResponse(

                            access.getUser().getId(),
                            access.getUser().getUserName(),
                            access.getUser().getEmail(),
                            access.getPermission()

                    )

            );

        }

        return collaborators;
    }
    public String removeCollaborator(Long documentId,
                                     Long userId,
                                     String ownerEmail) {

        User owner = userRepository.findByEmail(ownerEmail);

        Document document = documentRepository.findById(documentId)
                .orElse(null);

        if (document == null) {
            return "Document Not Found";
        }

        if (!document.getOwner().getId().equals(owner.getId())) {
            return "Access Denied";
        }

        User collaborator = userRepository.findById(userId)
                .orElse(null);

        if (collaborator == null) {
            return "User Not Found";
        }

        documentAccessRepository.deleteByDocumentAndUser(document, collaborator);

        return "Collaborator Removed Successfully";
    }
}