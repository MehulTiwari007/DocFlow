package com.mehul.docflow.controller;

import com.mehul.docflow.dto.ActiveUserMessage;
import com.mehul.docflow.service.ActiveUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ActiveUserController {

    @Autowired
    private ActiveUserService activeUserService;

    @MessageMapping("/active-users")
    @SendTo("/topic/active-users")
    public List<String> getActiveUsers(ActiveUserMessage message) {

        activeUserService.joinDocument(
                message.getDocumentId(),
                message.getEmail()
        );

        return activeUserService.getActiveUsers(
                message.getDocumentId()
        );
    }

}