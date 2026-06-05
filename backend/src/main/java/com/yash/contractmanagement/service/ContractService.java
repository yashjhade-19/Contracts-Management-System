package com.yash.contractmanagement.service;

import com.yash.contractmanagement.entity.Contract;
import com.yash.contractmanagement.entity.ContractStatus;
import com.yash.contractmanagement.entity.WorkflowHistory;
import com.yash.contractmanagement.repository.ContractRepository;
import com.yash.contractmanagement.repository.WorkflowHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private WorkflowHistoryRepository workflowHistoryRepository;

    public Page<Contract> getContracts(
            int page,
            int size,
            String search,
            ContractStatus status
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        if (status != null) {
            return contractRepository
                    .findByStatus(status, pageable);
        }

        if (search != null && !search.isBlank()) {

            return contractRepository
                    .findByTitleContainingIgnoreCaseOrOwnerNameContainingIgnoreCase(
                            search,
                            search,
                            pageable
                    );
        }

        return contractRepository.findAll(pageable);
    }

    public Contract getContractById(UUID id) {

        return contractRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Contract not found"
                        )
                );
    }

    public List<WorkflowHistory> getWorkflowHistory(UUID contractId) {

        return workflowHistoryRepository
                .findByContractId(contractId);
    }

    public Contract createContract(
            Contract contract
    ){

        contract.setId(UUID.randomUUID());

        contract.setCreatedAt(
                LocalDateTime.now()
        );

        contract.setUpdatedAt(
                LocalDateTime.now()
        );

        return contractRepository.save(contract);
    }
}