package com.yash.contractmanagement.controller;

import com.yash.contractmanagement.dto.ContractResponseDto;
import com.yash.contractmanagement.service.ContractService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ContractController.class)
class ContractControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ContractService contractService;

    @Test
    void shouldGetContractById() throws Exception {

        UUID id = UUID.randomUUID();

        ContractResponseDto dto =
                ContractResponseDto.builder()
                        .id(id)
                        .title("Vendor Agreement")
                        .ownerName("Yash")
                        .build();

        when(contractService.getContractById(id))
                .thenReturn(dto);

        mockMvc.perform(
                        get("/api/contracts/" + id)
                )
                .andExpect(status().isOk())
                .andExpect(
                        jsonPath("$.title")
                                .value("Vendor Agreement")
                );
    }
}