package com.cibertec.controller;

import com.cibertec.dto.api.request.TransactionRequest;
import com.cibertec.dto.api.response.TransactionResponse;
import com.cibertec.service.ITransactionService;
import javax.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transactions")
@AllArgsConstructor
public class TransactionController {

  private final ITransactionService transactionService;

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<TransactionResponse> registrar(@Valid @RequestBody TransactionRequest transactionRequest) throws Exception{
    TransactionResponse transactionResponse = transactionService.transferir(transactionRequest);
    return ResponseEntity.ok(transactionResponse);
  }
}
