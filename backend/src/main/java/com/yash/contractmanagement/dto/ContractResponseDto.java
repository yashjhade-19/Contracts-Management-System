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
public class ContractResponseDto {

    private UUID id;

    private String title;

    private String description;

    private ContractStatus status;

    private String ownerName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}