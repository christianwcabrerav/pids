package com.cibertec.dto.api.request;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistroOfertaRequest {
  private List<OfertaRequest> ofertaRequestList;
}
