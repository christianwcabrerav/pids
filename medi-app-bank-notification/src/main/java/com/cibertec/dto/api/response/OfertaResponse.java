package com.cibertec.dto.api.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class OfertaResponse {
  public List<Integer> idUsuarios;
  public String fechaRegistro;
}
