package com.mehul.docflow.repository;

import com.mehul.docflow.entity.Document;
import com.mehul.docflow.entity.DocumentVersion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentVersionRepository
        extends JpaRepository<DocumentVersion, Long> {

    List<DocumentVersion> findByDocumentOrderByCreatedAtDesc(Document document);


    void deleteByDocument(Document document);
}