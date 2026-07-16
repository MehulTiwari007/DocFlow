package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.Map;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ActiveUserService {

    // Thread-safe map
    private final Map<Long, Set<String>> activeUsers =
            new ConcurrentHashMap<>();

    // User joins a document
    public void joinDocument(Long documentId, String email) {

        activeUsers
                .computeIfAbsent(documentId,
                        id -> ConcurrentHashMap.newKeySet())
                .add(email);

    }

    // User leaves a document
    public void leaveDocument(Long documentId, String email) {

        Set<String> users = activeUsers.get(documentId);

        if (users != null) {

            users.remove(email);

            if (users.isEmpty()) {
                activeUsers.remove(documentId);
            }

        }

    }

    // Get all active users
    public List<String> getActiveUsers(Long documentId) {

        return new ArrayList<>(
                activeUsers.getOrDefault(
                        documentId,
                        ConcurrentHashMap.newKeySet()
                )
        );

    }
}