package com.mehul.docflow.repository;

import com.mehul.docflow.entity.Document;
import com.mehul.docflow.entity.DocumentAccess;
import com.mehul.docflow.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DocumentAccessRepository extends JpaRepository<DocumentAccess, Long> {

    List<DocumentAccess> findByUser(User user);

    List<DocumentAccess> findByDocument(Document document);

    Optional<DocumentAccess> findByDocumentAndUser(Document document, User user);

    @Transactional
    void deleteByDocument(Document document);

    @Transactional
    void deleteByDocumentAndUser(Document document, User user);
}