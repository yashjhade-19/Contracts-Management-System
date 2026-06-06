package com.yash.contractmanagement.service;

import com.yash.contractmanagement.dto.ContractResponseDto;
import com.yash.contractmanagement.entity.Contract;
import com.yash.contractmanagement.repository.ContractRepository;
import com.yash.contractmanagement.repository.WorkflowHistoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ContractServiceTest {

    @Mock
    private ContractRepository contractRepository;

    @Mock
    private WorkflowHistoryRepository workflowHistoryRepository;

    @InjectMocks
    private ContractService contractService;

    @Test
    void shouldReturnContractById() {

        UUID id = UUID.randomUUID();

        Contract contract = Contract.builder()
                .id(id)
                .title("Vendor Agreement")
                .description("Demo Contract")
                .ownerName("Yash")
                .build();

        when(contractRepository.findById(id))
                .thenReturn(Optional.of(contract));

        ContractResponseDto response =
                contractService.getContractById(id);

        assertEquals(
                "Vendor Agreement",
                response.getTitle()
        );
    }
}