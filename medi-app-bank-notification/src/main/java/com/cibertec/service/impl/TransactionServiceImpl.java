package com.cibertec.service.impl;

import com.cibertec.dao.ICuentaBancariaDAO;
import com.cibertec.dao.ITransaccionDAO;
import com.cibertec.dto.api.request.TransactionRequest;
import com.cibertec.dto.api.response.TransactionResponse;
import com.cibertec.model.CuentaBancaria;
import com.cibertec.model.TipoTransaccion;
import com.cibertec.model.Transaccion;
import com.cibertec.service.ITransactionService;
import com.cibertec.util.EmailService;
import com.cibertec.util.Mail;
import com.cibertec.util.NotificacionProccesor;
import com.cibertec.util.constants.Constants;
import com.cibertec.util.mappers.TransaccionMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
//@AllArgsConstructor
public class TransactionServiceImpl implements ITransactionService {

  private ITransaccionDAO transaccionDao;
  private ICuentaBancariaDAO cuentaBancariaDao;
  private TransaccionMapper transaccionMapper;
  private NotificacionProccesor notificacionProccesor;
  private EmailService emailService;

  public TransactionServiceImpl(ITransaccionDAO transaccionDao,
      ICuentaBancariaDAO cuentaBancariaDao
      , TransaccionMapper transaccionMapper,
      NotificacionProccesor notificacionProccesor,
      EmailService emailService) {
    this.transaccionDao = transaccionDao;
    this.cuentaBancariaDao = cuentaBancariaDao;
    this.transaccionMapper = transaccionMapper;
    this.notificacionProccesor = notificacionProccesor;
    this.emailService = emailService;
  }

  @Value("${spring.mail.username}")
  private String emailFrom;

  @Override
  @Transactional
  public TransactionResponse transferir(TransactionRequest transactionRequest) throws Exception {

    // Debitamos el saldo de la cuenta de origen
    CuentaBancaria cuentaBancariaOrigen = buscarCuentaOrigen(transactionRequest);

    validateConfiguracionTransferencias(cuentaBancariaOrigen);

    double nuevoSaldoCuentaOrigen = cuentaBancariaOrigen.getSaldo() - transactionRequest.getMonto();
    if (nuevoSaldoCuentaOrigen < 0) {
      throw new Exception("No se puede realizar la transferencia porque no cuenta con fondos suficientes");
    }
    cuentaBancariaOrigen.setSaldo(nuevoSaldoCuentaOrigen);
    cuentaBancariaDao.save(cuentaBancariaOrigen);

    // Aumentamos el saldo de la transferencia a la cuenta de destino
    CuentaBancaria cuentaBancariaDestino = buscarCuentaDestino(transactionRequest);
    double nuevoSaldoCuentaDestino = cuentaBancariaDestino.getSaldo() + transactionRequest.getMonto();
    cuentaBancariaDestino.setSaldo(nuevoSaldoCuentaDestino);
    cuentaBancariaDao.save(cuentaBancariaDestino);

    Transaccion transaccion = transaccionDao.save(builTransaction(transactionRequest));
    TransactionResponse transactionResponse = transaccionMapper.builTransactionResponse(transaccion);

    // Registrar las notificaciones
    this.notificacionProccesor.enviarNotificacionFromTransaction(transactionResponse);

    return transactionResponse;
  }

  private void validateConfiguracionTransferencias(CuentaBancaria cuentaBancariaOrigen) throws Exception {
    CuentaBancaria cuentaOrigen = this.cuentaBancariaDao.findOne(cuentaBancariaOrigen.getIdCuenta());
    if (cuentaOrigen.isNeutro()) {
      this.enviarEmail(cuentaOrigen.getUsuario().getUsername());
      throw new Exception("No puedes transferir, revista tu correo por favor");
    }
  }

  private void enviarEmail(String username) {

    Mail mail = new Mail();
    mail.setFrom(this.emailFrom);
    mail.setTo(username);
    mail.setSubject("Transferencia fallida - Mi banquito");

    Map<String, Object> model = new HashMap<>();
    model.put("user", username);
    mail.setModel(model);
    String templateUrl = "email/email-template-cuentas-inactivas";
    emailService.sendEmail(mail, templateUrl);
  }

  private CuentaBancaria buscarCuentaDestino(TransactionRequest transactionRequest) throws Exception {
    return getCuentaDestino(transactionRequest.getCuentaDestino());
  }

  private CuentaBancaria buscarCuentaOrigen(TransactionRequest transactionRequest) throws Exception {
    return cuentaBancariaDao.findByIdCuenta(transactionRequest.getIdCuentaOrigen())
        .orElseThrow(() -> new Exception("No existe una cuenta con ese id de cuenta"));
  }

  private Transaccion builTransaction(TransactionRequest transactionRequest) throws Exception {
    Transaccion transaccion = new Transaccion();
    TipoTransaccion tipoTransaccion = new TipoTransaccion();
    tipoTransaccion.setIdTipoTransaccion(Constants.TRANSACCION_TRANSFERENCIA);
    transaccion.setTipoTransaccion(tipoTransaccion);
    transaccion.setMonto(transactionRequest.getMonto());
    transaccion.setMoneda(transactionRequest.getMoneda());
    CuentaBancaria cuentaOrigen = new CuentaBancaria();
    cuentaOrigen.setIdCuenta(transactionRequest.getIdCuentaOrigen());
    transaccion.setCuentaOrigen(cuentaOrigen);
    // Buscamos la cuenta de destino, si no existe lanzamos una excepcion, eso tambien deberia ser validad por el frontend
    CuentaBancaria cuentaDestino = new CuentaBancaria();
    cuentaDestino.setIdCuenta(getCuentaDestino(transactionRequest.getCuentaDestino()).getIdCuenta());
    transaccion.setCuentaDestino(cuentaDestino);
    transaccion.setFechaOperacion(LocalDateTime.now());
    return transaccion;
  }

  private CuentaBancaria getCuentaDestino(String numeroCuentaDestino) throws Exception {
    return cuentaBancariaDao.findByNumeroCuenta(numeroCuentaDestino)
        .orElseThrow(() -> new Exception("La cuenta de destino no existe"));
  }
}
