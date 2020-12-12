package com.cibertec.service.impl;

import com.cibertec.dao.ICuentaBancariaDAO;
import com.cibertec.dto.api.request.ActualizarCuentaRequest;
import com.cibertec.dto.api.response.BuscarCuentaResponse;
import com.cibertec.dto.api.request.CuentaRequest;
import com.cibertec.dto.api.response.CuentaResponse;
import com.cibertec.model.CuentaBancaria;
import com.cibertec.service.ICuentaService;
import com.cibertec.util.mappers.CuentaMapper;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CuentaServiceImpl implements ICuentaService {

  private final ICuentaBancariaDAO cuentaBancariaDao;
  private final CuentaMapper cuentaMapper;

  @Override
  public List<CuentaResponse> listarCuentasPorNombreUsuario(String nombreUsuario) {
    return cuentaMapper.buildListCuentaResponse(cuentaBancariaDao.listarPorNombreUsuario(nombreUsuario));
  }

  @Override
  public Optional<BuscarCuentaResponse> buscarPorNumeroCuenta(String numeroCuenta) {
    return getCuenta(numeroCuenta).map(cuentaMapper::toBuscarCuentaResponse);
  }

  private Optional<CuentaBancaria> getCuenta(String numeroCuentaDestino) {
    return cuentaBancariaDao.findByNumeroCuenta(numeroCuentaDestino);
  }

  @Override
  public Optional<CuentaResponse> buscarPorIdCuenta(Integer idCuenta) {
    return cuentaBancariaDao.findByIdCuenta(idCuenta)
        .map(cuentaMapper::toCuentaResponse);
  }

  @Override
  public List<CuentaResponse> actualizar(ActualizarCuentaRequest cuentaRequestList) {
    return cuentaRequestList.getCuentas().stream()
        .map(this::buscaYGraba)
        .map(this.cuentaMapper::toCuentaResponse)
        .collect(Collectors.toList());
  }

  private CuentaBancaria buscaYGraba(CuentaRequest cuentaRequest) {
    CuentaBancaria one = this.cuentaBancariaDao.findOne(cuentaRequest.getIdCuenta());
    one.setNeutro(cuentaRequest.isNeutro());
    return this.cuentaBancariaDao.save(one);
  }
}
