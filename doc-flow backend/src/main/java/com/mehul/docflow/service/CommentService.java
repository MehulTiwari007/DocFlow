package com.mehul.docflow.service;

import com.mehul.docflow.dto.CommentRequest;
import com.mehul.docflow.dto.CommentResponse;
import com.mehul.docflow.entity.Comment;
import com.mehul.docflow.entity.Document;
import com.mehul.docflow.entity.User;
import com.mehul.docflow.repository.CommentRepository;
import com.mehul.docflow.repository.DocumentRepository;
import com.mehul.docflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private UserRepository userRepository;

    // Add Comment
    public String addComment(CommentRequest request, String email) {

        User user = userRepository.findByEmail(email);

        Document document = documentRepository
                .findById(request.getDocumentId())
                .orElse(null);

        if (document == null) {
            return "Document Not Found";
        }

        Comment comment = new Comment();

        comment.setText(request.getText());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setStatus("OPEN");
        comment.setDocument(document);
        comment.setUser(user);

        commentRepository.save(comment);

        return "Comment Added Successfully";
    }

    // Get Comments
    public List<CommentResponse> getComments(Long documentId) {

        Document document = documentRepository
                .findById(documentId)
                .orElse(null);

        if (document == null) {
            return List.of();
        }

        List<Comment> comments =
                commentRepository.findByDocumentOrderByCreatedAtAsc(document);

        List<CommentResponse> response = new ArrayList<>();

        for (Comment comment : comments) {

            response.add(

                    new CommentResponse(

                            comment.getId(),
                            comment.getUser().getUserName(),
                            comment.getText(),
                            comment.getCreatedAt(),
                            comment.getStatus()

                    )

            );

        }

        return response;
    }

    // Resolve Comment
    public String resolveComment(Long id) {

        Comment comment = commentRepository
                .findById(id)
                .orElse(null);

        if (comment == null) {
            return "Comment Not Found";
        }

        comment.setStatus("RESOLVED");

        commentRepository.save(comment);

        return "Comment Resolved Successfully";
    }

}