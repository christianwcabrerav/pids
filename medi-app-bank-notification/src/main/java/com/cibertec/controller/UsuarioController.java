package com.cibertec.controller;

import com.cibertec.dto.api.response.UsuarioResponse;
import com.cibertec.service.IUsuarioService;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

  @Resource(name = "tokenServices")
  private ConsumerTokenServices tokenServices;

  @Autowired
  private IUsuarioService userService;

  /**
   * Elimina el token de la base de datos.
   *
   * @param token
   */
  @GetMapping(value = "/anular/{tokenId:.*}") // Expresion regular para que me lea todos los caracteres
  public void revokeToken(@PathVariable("tokenId") String token) {
    tokenServices.revokeToken(token);
  }

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<UsuarioResponse>> listar() {
    List<UsuarioResponse> usuarios = this.userService.listar();
    return new ResponseEntity<>(usuarios, HttpStatus.OK);
  }

}
