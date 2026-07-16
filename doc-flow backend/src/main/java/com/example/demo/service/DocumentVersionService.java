package com.example.demo.service;

import com.example.demo.dto.DocumentVersionResponse;
import com.example.demo.entity.Document;
import com.example.demo.entity.DocumentVersion;
import com.example.demo.repository.DocumentRepository;
import com.example.demo.repository.DocumentVersionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DocumentVersionService {

    @Autowired
    private DocumentVersionRepository versionRepository;

    @Autowired
    private DocumentRepository documentRepository;

    // Save Version
    public void saveVersion(Document document) {

        DocumentVersion version = new DocumentVersion();

        version.setTitle(document.getTitle());
        version.setContent(document.getContent());
        version.setCreatedAt(LocalDateTime.now());
        version.setDocument(document);

        versionRepository.save(version);

    }

    // Get Version History
    public List<DocumentVersionResponse> getVersions(Long documentId) {

        Document document = documentRepository
                .findById(documentId)
                .orElse(null);

        if (document == null) {
            return List.of();
        }

        List<DocumentVersion> versions =
                versionRepository.findByDocumentOrderByCreatedAtDesc(document);

        List<DocumentVersionResponse> response = new ArrayList<>();

        for (DocumentVersion version : versions) {

            response.add(

                    new DocumentVersionResponse(

                            version.getId(),
                            version.getTitle(),
                            version.getCreatedAt()

                    )

            );

        }

        return response;
    }

    // Restore Version
    public String restoreVersion(Long versionId) {

        DocumentVersion version = versionRepository
                .findById(versionId)
                .orElse(null);

        if (version == null) {
            return "Version Not Found";
        }

        Document document = version.getDocument();

        document.setTitle(version.getTitle());
        document.setContent(version.getContent());

        documentRepository.save(document);

        return "Version Restored Successfully";
    }

}