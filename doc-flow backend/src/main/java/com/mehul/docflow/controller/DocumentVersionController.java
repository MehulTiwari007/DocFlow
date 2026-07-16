package com.mehul.docflow.controller;

import com.mehul.docflow.dto.DocumentVersionResponse;
import com.mehul.docflow.service.DocumentVersionService;
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