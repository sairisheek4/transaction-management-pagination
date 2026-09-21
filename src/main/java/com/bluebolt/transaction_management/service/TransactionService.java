package com.bluebolt.transaction_management.service;

import com.bluebolt.transaction_management.entity.Transaction;
import org.springframework.data.domain.Page;

public interface TransactionService {
    Page<Transaction> getTransactions(Long accountId, int page, int size, String sortBy, String direction);
}