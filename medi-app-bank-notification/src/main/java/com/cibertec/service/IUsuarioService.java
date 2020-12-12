package com.cibertec.service;

import com.cibertec.dto.api.response.UsuarioResponse;
import java.util.List;

public interface IUsuarioService {
  List<UsuarioResponse> listar();
}
