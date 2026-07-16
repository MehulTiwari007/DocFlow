package com.example.demo.controller;

import com.example.demo.dto.DocumentVersionResponse;
import com.example.demo.service.DocumentVersionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/document-versions")
public class DocumentVersionController {

    @Autowired
    private DocumentVersionService documentVersionService;

    // Get Version History
    @GetMapping("/{documentId}")
    public List<DocumentVersionResponse> getVersions(
            @PathVariable Long documentId,
            Authentication authentication) {

        return documentVersionService.getVersions(documentId);

    }

    // Restore Version
    @PostMapping("/{versionId}/restore")
    public String restoreVersion(
            @PathVariable Long versionId,
            Authentication authentication) {

        return documentVersionService.restoreVersion(versionId);

    }

}