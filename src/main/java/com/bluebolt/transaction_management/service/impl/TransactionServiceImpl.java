package com.bluebolt.transaction_management.service.impl;

import com.bluebolt.transaction_management.entity.Transaction;
import com.bluebolt.transaction_management.repository.TransactionRepository;
import com.bluebolt.transaction_management.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    private static final Set<String> ALLOWED_SORT_FIELDS =
            Set.of("transactionDate", "amount", "transactionType");

    @Override
    public Page<Transaction> getTransactions(Long accountId, int page, int size, String sortBy, String direction) {
        if (!ALLOWED_SORT_FIELDS.contains(sortBy)) {
            sortBy = "transactionDate";
        }

        Sort sort = direction.equalsIgnoreCase("DESC")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return transactionRepository.findByAccountId(accountId, pageable);
    }
}