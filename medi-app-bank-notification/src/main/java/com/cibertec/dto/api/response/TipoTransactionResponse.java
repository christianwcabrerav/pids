package com.cibertec.dto.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TipoTransactionResponse {
  private int idTipoTransaction;
  private String descripcion;
}
