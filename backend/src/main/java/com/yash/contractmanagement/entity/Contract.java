package com.yash.contractmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "contracts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contract {

    @Id
    private UUID id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private ContractStatus status;

    @Column(name = "owner_name")
    private String ownerName;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(
            mappedBy = "contract",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<WorkflowHistory> workflowHistory;
}