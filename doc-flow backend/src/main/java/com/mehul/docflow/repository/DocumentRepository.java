package com.mehul.docflow.repository;

import com.mehul.docflow.entity.Document;
import com.mehul.docflow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findByTitleContainingIgnoreCase(String title);

    List<Document> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(
            String title,
            String content
    );

    List<Document> findByOwner(User owner);

}