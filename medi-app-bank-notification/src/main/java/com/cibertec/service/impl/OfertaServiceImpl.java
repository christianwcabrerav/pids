package com.cibertec.service.impl;

import com.cibertec.dao.IOfertaDAO;
import com.cibertec.dto.api.request.RegistroOfertaRequest;
import com.cibertec.dto.api.response.OfertaResponse;
import com.cibertec.service.IOfertaService;
import com.cibertec.util.NotificacionProccesor;
import com.cibertec.util.NotificationHelper;
import com.cibertec.util.mappers.OfertaMapper;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class OfertaServiceImpl implements IOfertaService {

  private final IOfertaDAO ofertaDAO;
  private final OfertaMapper ofertaMapper;
  private final NotificacionProccesor notificacionProccesor;

  @Override
  @Transactional
  public OfertaResponse registrar(RegistroOfertaRequest request) {
    OfertaResponse ofertaResponse = this.ofertaMapper
        .builOfertaResponse(
            request.getOfertaRequestList()
                .stream()
                .map(ofertaRequest -> this.ofertaDAO.save(this.ofertaMapper.buildOferta(ofertaRequest)))
                .collect(Collectors.toList()));

    // Registrar las notificaciones
    this.notificacionProccesor.enviarNotificacionFromOfertas(ofertaResponse);
    return ofertaResponse;
  }
}
