package com.bluebolt.transaction_management.controller;

import com.bluebolt.transaction_management.entity.Transaction;
import com.bluebolt.transaction_management.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public ResponseEntity<Page<Transaction>> getTransactions(
            @RequestParam Long accountId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "transactionDate") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction) {

        Page<Transaction> transactions = transactionService.getTransactions(accountId, page, size, sortBy, direction);
        return ResponseEntity.ok(transactions);
    }
}