package com.cibertec.controller;

import com.cibertec.dto.api.request.RegistroOfertaRequest;
import com.cibertec.dto.api.response.OfertaResponse;
import com.cibertec.service.IOfertaService;
import javax.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/ofertas")
public class OfertaController {

  private final IOfertaService ofertaService;

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<OfertaResponse> registrar(@Valid @RequestBody RegistroOfertaRequest request){
    OfertaResponse ofertaResponse = ofertaService.registrar(request);
    return ResponseEntity.ok(ofertaResponse);
  }
}
