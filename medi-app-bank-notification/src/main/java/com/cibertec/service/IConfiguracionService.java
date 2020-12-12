package com.cibertec.service;

import com.cibertec.dto.api.request.ConfiguracionRequest;
import com.cibertec.dto.api.response.ConfiguracionResponse;
import java.util.List;
import java.util.Optional;

public interface IConfiguracionService {

  List<ConfiguracionResponse> listar();

  Optional<ConfiguracionResponse> buscarPorUsername(String username);

  ConfiguracionResponse actualizar(ConfiguracionRequest request);

  Optional<ConfiguracionResponse> buscarPorId(int idConfiguracion);
}
