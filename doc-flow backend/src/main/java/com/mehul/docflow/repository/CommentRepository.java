package com.mehul.docflow.repository;

import com.mehul.docflow.entity.Comment;
import com.mehul.docflow.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByDocumentOrderByCreatedAtAsc(Document document);

}