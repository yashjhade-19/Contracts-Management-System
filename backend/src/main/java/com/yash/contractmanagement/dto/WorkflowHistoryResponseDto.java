package com.yash.contractmanagement.dto;

import com.yash.contractmanagement.entity.ContractStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkflowHistoryResponseDto {

    private UUID id;

    private ContractStatus previousStatus;

    private ContractStatus newStatus;

    private String changedBy;

    private LocalDateTime changedAt;

    private UUID contractId;
}