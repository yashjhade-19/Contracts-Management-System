package com.yash.contractmanagement.repository;

import com.yash.contractmanagement.entity.Contract;
import com.yash.contractmanagement.entity.ContractStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ContractRepository
        extends JpaRepository<Contract, UUID> {

    Page<Contract> findByStatus(
            ContractStatus status,
            Pageable pageable
    );

    Page<Contract> findByTitleContainingIgnoreCase(
            String title,
            Pageable pageable
    );

    Page<Contract> findByOwnerNameContainingIgnoreCase(
            String ownerName,
            Pageable pageable
    );

    Page<Contract> findByTitleContainingIgnoreCaseOrOwnerNameContainingIgnoreCase(
            String title,
            String ownerName,
            Pageable pageable
    );
}