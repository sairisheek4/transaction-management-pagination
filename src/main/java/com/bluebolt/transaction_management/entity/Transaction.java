package com.bluebolt.transaction_management.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@Table(name = "transactions")
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long accountId;

    private BigDecimal amount;

    private String transactionType; // DEPOSIT, WITHDRAWAL, TRANSFER

    private LocalDate transactionDate;

    private String description;
}