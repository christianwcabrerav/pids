package com.cibertec.service.impl;

import com.cibertec.dao.IConfiguracionDAO;
import com.cibertec.dao.IUsuarioDAO;
import com.cibertec.dto.api.request.ConfiguracionRequest;
import com.cibertec.dto.api.response.ConfiguracionResponse;
import com.cibertec.model.Usuario;
import com.cibertec.service.IConfiguracionService;
import com.cibertec.util.mappers.ConfiguracionMapper;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ConfiguracionServiceImpl implements IConfiguracionService {

  private final IConfiguracionDAO configuracionDAO;
  private final IUsuarioDAO usuarioDAO;
  private final ConfiguracionMapper configuracionMapper;

  @Override
  public List<ConfiguracionResponse> listar() {
    return configuracionDAO.findAll().stream().map(this.configuracionMapper::buildConfiguracionResponse).collect(Collectors.toList());
  }

  @Override
  public Optional<ConfiguracionResponse> buscarPorUsername(String username) {
    return configuracionDAO.findByUsuario_Username(username).map(this.configuracionMapper::buildConfiguracionResponse);
  }

  @Override
  public ConfiguracionResponse actualizar(ConfiguracionRequest request) {
    Usuario usuario = usuarioDAO.findOneByUsername(request.getUsername());
    return this.configuracionMapper.buildConfiguracionResponse(configuracionDAO.save(this.configuracionMapper.buildConfiguracion(request,
        usuario)));
  }

  @Override
  public Optional<ConfiguracionResponse> buscarPorId(int idConfiguracion) {
    return Optional.ofNullable(configuracionDAO.findOne(idConfiguracion)).map(this.configuracionMapper::buildConfiguracionResponse);
  }
}
