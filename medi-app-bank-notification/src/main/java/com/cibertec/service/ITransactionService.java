package com.cibertec.service;

import com.cibertec.dto.api.request.TransactionRequest;
import com.cibertec.dto.api.response.TransactionResponse;

public interface ITransactionService {

  TransactionResponse transferir(TransactionRequest transactionRequest) throws Exception;

}
