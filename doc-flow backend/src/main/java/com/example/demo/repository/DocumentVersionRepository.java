package com.example.demo.repository;

import com.example.demo.entity.Document;
import com.example.demo.entity.DocumentVersion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentVersionRepository
        extends JpaRepository<DocumentVersion, Long> {

    List<DocumentVersion> findByDocumentOrderByCreatedAtDesc(Document document);

}