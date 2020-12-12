package com.cibertec.util.mappers;

import com.cibertec.dto.api.response.BuscarCuentaResponse;
import com.cibertec.dto.api.response.CuentaResponse;
import com.cibertec.model.CuentaBancaria;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class CuentaMapper {

  public List<CuentaResponse> buildListCuentaResponse(List<Object[]> cuentaBancariaList) {
    return cuentaBancariaList.stream().map(this::toCuentaResponse).collect(Collectors.toList());
  }

  public CuentaResponse toCuentaResponse(Object[] objeto) {
    return CuentaResponse.builder()
        .idCuenta(Integer.parseInt(String.valueOf(objeto[0])))
        .moneda(String.valueOf(objeto[1]))
        .neutro(Boolean.parseBoolean(String.valueOf(objeto[2])))
        .numeroCuenta(String.valueOf(objeto[3]))
        .saldo(Double.parseDouble(String.valueOf(objeto[4])))

        .build();
  }

  public CuentaResponse toCuentaResponse(CuentaBancaria cuentaBancaria) {
    return CuentaResponse.builder()
        .idCuenta(cuentaBancaria.getIdCuenta())
        .numeroCuenta(cuentaBancaria.getNumeroCuenta())
        .saldo(cuentaBancaria.getSaldo())
        .moneda(cuentaBancaria.getMoneda())
        .neutro(cuentaBancaria.isNeutro())
        .build();
  }

  public BuscarCuentaResponse toBuscarCuentaResponse(CuentaBancaria cuentaBancaria) {
    return BuscarCuentaResponse.builder()
        .idCuenta(cuentaBancaria.getIdCuenta())
        .numeroCuenta(cuentaBancaria.getNumeroCuenta())
        .username(cuentaBancaria.getUsuario().getUsername())
        .build();
  }
}
