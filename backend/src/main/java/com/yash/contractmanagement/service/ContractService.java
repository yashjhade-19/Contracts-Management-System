package com.yash.contractmanagement.service;

import com.yash.contractmanagement.dto.ContractRequestDto;
import com.yash.contractmanagement.dto.ContractResponseDto;
import com.yash.contractmanagement.dto.WorkflowHistoryResponseDto;
import com.yash.contractmanagement.entity.Contract;
import com.yash.contractmanagement.entity.ContractStatus;
import com.yash.contractmanagement.entity.WorkflowHistory;
import com.yash.contractmanagement.repository.ContractRepository;
import com.yash.contractmanagement.repository.WorkflowHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
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

    public Page<ContractResponseDto> getContracts(
            int page,
            int size,
            String search,
            ContractStatus status
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        Page<Contract> contracts;

        if (status != null) {

            contracts =
                    contractRepository.findByStatus(
                            status,
                            pageable
                    );

        } else if (search != null && !search.isBlank()) {

            contracts =
                    contractRepository
                            .findByTitleContainingIgnoreCaseOrOwnerNameContainingIgnoreCase(
                                    search,
                                    search,
                                    pageable
                            );

        } else {

            contracts =
                    contractRepository.findAll(pageable);
        }

        return contracts.map(this::convertToResponseDto);
    }

    public ContractResponseDto getContractById(UUID id) {

        Contract contract =
                contractRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Contract not found"
                                )
                        );

        return convertToResponseDto(contract);
    }

    public List<WorkflowHistoryResponseDto> getWorkflowHistory(
            UUID contractId
    ) {

        return workflowHistoryRepository
                .findByContractId(contractId)
                .stream()
                .map(this::convertToHistoryDto)
                .toList();
    }

    public ContractResponseDto createContract(
            ContractRequestDto dto
    ) {

        Contract contract =
                Contract.builder()
                        .id(UUID.randomUUID())
                        .title(dto.getTitle())
                        .description(dto.getDescription())
                        .status(dto.getStatus())
                        .ownerName(dto.getOwnerName())
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();

        contract =
                contractRepository.save(contract);

        return convertToResponseDto(contract);
    }

    private ContractResponseDto convertToResponseDto(
            Contract contract
    ) {

        return ContractResponseDto.builder()
                .id(contract.getId())
                .title(contract.getTitle())
                .description(contract.getDescription())
                .status(contract.getStatus())
                .ownerName(contract.getOwnerName())
                .createdAt(contract.getCreatedAt())
                .updatedAt(contract.getUpdatedAt())
                .build();
    }

    private WorkflowHistoryResponseDto convertToHistoryDto(
            WorkflowHistory history
    ) {

        return WorkflowHistoryResponseDto.builder()
                .id(history.getId())
                .previousStatus(history.getPreviousStatus())
                .newStatus(history.getNewStatus())
                .changedBy(history.getChangedBy())
                .changedAt(history.getChangedAt())
                .contractId(
                        history.getContract().getId()
                )
                .build();
    }
}