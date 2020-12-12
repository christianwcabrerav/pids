package com.cibertec.service;

import com.cibertec.dto.api.request.RegistroOfertaRequest;
import com.cibertec.dto.api.response.OfertaResponse;

public interface IOfertaService {

  OfertaResponse registrar(RegistroOfertaRequest request);

}
