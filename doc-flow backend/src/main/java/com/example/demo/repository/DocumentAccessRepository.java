package com.example.demo.repository;

import com.example.demo.entity.Document;
import com.example.demo.entity.DocumentAccess;
import com.example.demo.entity.User;
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