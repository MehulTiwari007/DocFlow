package com.example.demo.controller;

import com.example.demo.dto.CommentRequest;
import com.example.demo.dto.CommentResponse;
import com.example.demo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // Add Comment
    @PostMapping
    public String addComment(@RequestBody CommentRequest request,
                             Authentication authentication) {

        String email = authentication.getName();

        return commentService.addComment(request, email);
    }

    // Get Comments
    @GetMapping("/{documentId}")
    public List<CommentResponse> getComments(
            @PathVariable Long documentId) {

        return commentService.getComments(documentId);

    }

    // Resolve Comment
    @PutMapping("/{id}/resolve")
    public String resolveComment(@PathVariable Long id) {

        return commentService.resolveComment(id);

    }

}