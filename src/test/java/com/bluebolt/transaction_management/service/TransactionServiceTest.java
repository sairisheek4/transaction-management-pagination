package com.bluebolt.transaction_management.service;

import com.bluebolt.transaction_management.entity.Transaction;
import com.bluebolt.transaction_management.repository.TransactionRepository;
import com.bluebolt.transaction_management.service.impl.TransactionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetTransactions_ValidSortField_ReturnsPagedResult() {
        // Arrange
        Transaction t1 = new Transaction();
        t1.setId(1L);
        t1.setAccountId(101L);
        t1.setAmount(BigDecimal.valueOf(500));
        t1.setTransactionType("DEPOSIT");
        t1.setTransactionDate(LocalDate.of(2026, 1, 5));

        Page<Transaction> mockPage = new PageImpl<>(List.of(t1));

        when(transactionRepository.findByAccountId(eq(101L), any(Pageable.class)))
                .thenReturn(mockPage);

        // Act
        Page<Transaction> result = transactionService.getTransactions(101L, 0, 20, "amount", "DESC");

        // Assert
        assertEquals(1, result.getContent().size());
        assertEquals("DEPOSIT", result.getContent().get(0).getTransactionType());
        verify(transactionRepository, times(1)).findByAccountId(eq(101L), any(Pageable.class));
    }

    @Test
    void testGetTransactions_InvalidSortField_FallsBackToDefault() {
        // Arrange
        when(transactionRepository.findByAccountId(eq(101L), any(Pageable.class)))
                .thenReturn(Page.empty());

        // Act
        transactionService.getTransactions(101L, 0, 20, "someInvalidField", "ASC");

        // Assert — capture the Pageable passed to repository and check sort field defaulted
        verify(transactionRepository).findByAccountId(eq(101L), argThat(pageable ->
                pageable.getSort().getOrderFor("transactionDate") != null
        ));
    }

    @Test
    void testGetTransactions_EmptyResult_ReturnsEmptyPage() {
        // Arrange
        when(transactionRepository.findByAccountId(eq(999L), any(Pageable.class)))
                .thenReturn(Page.empty());

        // Act
        Page<Transaction> result = transactionService.getTransactions(999L, 0, 20, "amount", "ASC");

        // Assert
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetTransactions_AscendingSort_SetsCorrectDirection() {
        // Arrange
        when(transactionRepository.findByAccountId(eq(101L), any(Pageable.class)))
                .thenReturn(Page.empty());

        // Act
        transactionService.getTransactions(101L, 0, 20, "amount", "ASC");

        // Assert
        verify(transactionRepository).findByAccountId(eq(101L), argThat(pageable ->
                pageable.getSort().getOrderFor("amount").getDirection() == Sort.Direction.ASC
        ));
    }
}