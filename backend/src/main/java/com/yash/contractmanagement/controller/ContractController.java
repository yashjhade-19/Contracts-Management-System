package com.yash.contractmanagement.controller;

import com.yash.contractmanagement.entity.Contract;
import com.yash.contractmanagement.entity.ContractStatus;
import com.yash.contractmanagement.entity.WorkflowHistory;
import com.yash.contractmanagement.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/contracts")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @GetMapping
    public Page<Contract> getContracts(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size,

            @RequestParam(required = false)
            String search,

            @RequestParam(required = false)
            ContractStatus status
    ) {

        return contractService.getContracts(
                page,
                size,
                search,
                status
        );
    }

    @GetMapping("/{id}")
    public Contract getContractById(
            @PathVariable UUID id
    ) {

        return contractService.getContractById(id);
    }

    @GetMapping("/{id}/history")
    public List<WorkflowHistory> getWorkflowHistory(
            @PathVariable UUID id
    ) {

        return contractService.getWorkflowHistory(id);
    }

    @PostMapping
    public Contract createContract(
            @RequestBody Contract contract
    ){

        return contractService
                .createContract(contract);
    }
}