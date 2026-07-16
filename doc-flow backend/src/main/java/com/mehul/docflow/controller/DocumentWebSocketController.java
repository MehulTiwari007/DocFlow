package com.mehul.docflow.controller;

import com.mehul.docflow.dto.DocumentRequest;
import com.mehul.docflow.entity.Document;
import com.mehul.docflow.service.ActiveUserService;
import com.mehul.docflow.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class DocumentWebSocketController {

    @Autowired
    private DocumentService documentService;

    @Autowired
    private ActiveUserService activeUserService;

    @MessageMapping("/document")
    @SendTo("/topic/document")
    public DocumentRequest editDocument(DocumentRequest message) {

        System.out.println("Email: " + message.getEmail());

        Document updatedDocument =
                documentService.updateDocumentRealtime(message);

        if (updatedDocument == null) {
            return null;
        }

        // Add the user to active users
        activeUserService.joinDocument(
                message.getDocumentId(),
                message.getEmail()
        );

        return message;
    }

}