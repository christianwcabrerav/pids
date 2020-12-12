package com.cibertec.util.mappers;

import com.cibertec.dto.api.request.OfertaRequest;
import com.cibertec.dto.api.response.OfertaResponse;
import com.cibertec.model.Oferta;
import com.cibertec.model.TipoOferta;
import com.cibertec.model.Usuario;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class OfertaMapper {

  public OfertaResponse builOfertaResponse(List<Oferta> ofertaList){
    DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-M-dd HH:mm:ss");
    List<Integer> usuariosId = ofertaList.stream().map(oferta -> oferta.getUsuario().getIdUsuario()).collect(Collectors.toList());
    return OfertaResponse.builder()
        .idUsuarios(usuariosId)
        .fechaRegistro(LocalDateTime.now().format(FORMATTER))
        .build();
  }

  public Oferta buildOferta(OfertaRequest ofertaRequest) {
    Usuario usuario = new Usuario();
    usuario.setIdUsuario(ofertaRequest.getIdUsuario());
    TipoOferta tipoOferta = new TipoOferta();
    tipoOferta.setIdTipoOferta(ofertaRequest.getIdTipoOferta());
    Oferta oferta = new Oferta();
    oferta.setTipoOferta(tipoOferta);
    oferta.setUsuario(usuario);
    oferta.setFechaRegistro(LocalDateTime.now());
    return oferta;
  }
}
