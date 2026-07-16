package com.mehul.docflow.controller;

import com.mehul.docflow.dto.ShareDocumentRequest;
import com.mehul.docflow.security.JwtService;
import com.mehul.docflow.service.DocumentAccessService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/document-access")
@CrossOrigin(origins = "*")
public class DocumentAccessController {

    @Autowired
    private DocumentAccessService documentAccessService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/share")
    public String shareDocument(@RequestBody ShareDocumentRequest request,
                                HttpServletRequest httpRequest) {

        String header = httpRequest.getHeader("Authorization");

        String token = header.substring(7);

        String ownerEmail = jwtService.extractEmail(token);

        return documentAccessService.shareDocument(request, ownerEmail);

    }

}