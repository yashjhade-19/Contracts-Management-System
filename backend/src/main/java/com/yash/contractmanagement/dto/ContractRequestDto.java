package com.yash.contractmanagement.dto;

import com.yash.contractmanagement.entity.ContractStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractRequestDto {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Status is required")
    private ContractStatus status;

    @NotBlank(message = "Owner name is required")
    private String ownerName;
}