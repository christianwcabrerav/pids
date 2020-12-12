package com.cibertec.util.mappers;

import com.cibertec.dao.ICuentaBancariaDAO;
import com.cibertec.dao.ITipoTransaccionDAO;
import com.cibertec.dto.api.response.CuentaResponse;
import com.cibertec.dto.api.response.TipoTransactionResponse;
import com.cibertec.dto.api.response.TransactionResponse;
import com.cibertec.model.CuentaBancaria;
import com.cibertec.model.TipoTransaccion;
import com.cibertec.model.Transaccion;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class TransaccionMapper {

  private final ITipoTransaccionDAO tipoTransaccionDAO;
  private final ICuentaBancariaDAO cuentaBancariaDAO;

  public TransactionResponse builTransactionResponse(Transaccion transaccion) {

    DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-M-dd HH:mm:ss");
    TipoTransaccion tipoTransaccion = tipoTransaccionDAO.findOne(transaccion.getTipoTransaccion().getIdTipoTransaccion());
    CuentaBancaria cuentaOrigen = cuentaBancariaDAO.findOne(transaccion.getCuentaOrigen().getIdCuenta());
    CuentaBancaria cuentaDestino = cuentaBancariaDAO.findOne(transaccion.getCuentaDestino().getIdCuenta());
    return TransactionResponse.builder()
        .codigoTransaction(transaccion.getIdTransaccion())
        .monto(transaccion.getMonto())
        .moneda(transaccion.getMoneda())
        .fechaOperacion(transaccion.getFechaOperacion().format(FORMATTER))
        .tipoTransaction(
            TipoTransactionResponse.builder()
                .idTipoTransaction(transaccion.getTipoTransaccion().getIdTipoTransaccion())
                .descripcion(tipoTransaccion.getDescripcion())
                .build()
        )
        .cuentaOrigen(
            CuentaResponse.builder()
                .idCuenta(transaccion.getCuentaOrigen().getIdCuenta())
                .moneda(cuentaOrigen.getMoneda())
                .numeroCuenta(cuentaOrigen.getNumeroCuenta())
                .saldo(cuentaOrigen.getSaldo())
                .idUsername(cuentaOrigen.getUsuario().getIdUsuario())
                .username(cuentaOrigen.getUsuario().getUsername())
                .build())
        .cuentaDestino(
            CuentaResponse.builder()
                .idCuenta(transaccion.getCuentaDestino().getIdCuenta())
                .moneda(cuentaDestino.getMoneda())
                .numeroCuenta(cuentaDestino.getNumeroCuenta())
                .saldo(cuentaDestino.getSaldo())
                .idUsername(cuentaDestino.getUsuario().getIdUsuario())
                .username(cuentaDestino.getUsuario().getUsername())
                .build()
        )
        .build();
  }
}
