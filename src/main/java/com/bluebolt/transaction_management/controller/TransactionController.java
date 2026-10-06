package com.bluebolt.transaction_management.controller;

import com.bluebolt.transaction_management.entity.Transaction;
import com.bluebolt.transaction_management.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/transactions")
@Tag(name = "Transaction API", description = "Endpoints for paginated and sorted transaction retrieval")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Operation(summary = "Get paginated and sorted transactions for an account")
    @GetMapping
    public ResponseEntity<Page<Transaction>> getTransactions(
            @Parameter(description = "Account ID to fetch transactions for") @RequestParam Long accountId,
            @Parameter(description = "Page number (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Number of records per page") @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "Field to sort by: transactionDate, amount, transactionType") @RequestParam(defaultValue = "transactionDate") String sortBy,
            @Parameter(description = "Sort direction: ASC or DESC") @RequestParam(defaultValue = "DESC") String direction) {

        if (page < 0) {
            throw new IllegalArgumentException("Page number cannot be negative");
        }
        if (size <= 0 || size > 100) {
            throw new IllegalArgumentException("Page size must be between 1 and 100");
        }

        Page<Transaction> transactions = transactionService.getTransactions(accountId, page, size, sortBy, direction);
        return ResponseEntity.ok(transactions);
    }
}