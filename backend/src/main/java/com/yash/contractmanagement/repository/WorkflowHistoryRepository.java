package com.yash.contractmanagement.repository;

import com.yash.contractmanagement.entity.WorkflowHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WorkflowHistoryRepository
        extends JpaRepository<WorkflowHistory, UUID> {

    List<WorkflowHistory> findByContractId(UUID contractId);

}