package com.cibertec.controller;

import com.cibertec.model.ResetToken;
import com.cibertec.model.Usuario;
import com.cibertec.service.ILoginService;
import com.cibertec.service.IResetTokenService;
import com.cibertec.util.EmailService;
import com.cibertec.util.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/login")
public class LoginController {

  @Autowired
  private ILoginService loginService;

  @Autowired
  private IResetTokenService resetTokenService;

  @Autowired
  private EmailService emailService;

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @PostMapping(value = "/enviarCorreo", consumes = MediaType.TEXT_PLAIN_VALUE)
  public ResponseEntity<Integer> enviarCorreo(@RequestBody String correo) {
    int rpta = 0;
    try {

      Optional<Usuario> usuarioOptional = loginService.verificarNombreUsuario(correo);
      if (usuarioOptional.isPresent()) {

        ResetToken token = new ResetToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUsuario(usuarioOptional.get());

        //Asignamos un minuto de expiracion a la url autogenerada.
        token.setExpiracion(1);

        // Persistimos el token en la Base de datos.
        resetTokenService.guardar(token);

        Mail mail = new Mail();
        mail.setFrom("julioedgarmejiarojas338@gmail.com");
        mail.setTo(usuarioOptional.get().getUsername());
        mail.setSubject("RESTABLECER CONTRASEÑA - MEDIAPP");

        String url = "http://localhost:4200/recuperar/" + token.getToken();

        Map<String, Object> model = new HashMap<>();
        model.put("user", token.getUsuario().getUsername());
        model.put("resetUrl", url);
        mail.setModel(model);

        String templateUrl = "email/email-template";

        emailService.sendEmail(mail, templateUrl);
        rpta = 1;
      }

    } catch (Exception e) {
      return new ResponseEntity<Integer>(rpta, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<Integer>(rpta, HttpStatus.OK);
  }

  @GetMapping(value = "/restablecer/verificar/{token}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Integer> restablecerClave(@PathVariable("token") String token) {
    int rpta = 0;
    try {
      if (token != null && !token.isEmpty()) {
        ResetToken rt = resetTokenService.findByToken(token);
        if (rt != null && rt.getId() > 0) {
          if (!rt.isExpirado()) {
            rpta = 1;
          }
        }
      }
    } catch (Exception e) {
      return new ResponseEntity<Integer>(rpta, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<Integer>(rpta, HttpStatus.OK);
  }

  @PostMapping(value = "/restablecer/{token}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Integer> restablecerClave(@PathVariable("token") String token, @RequestBody String clave) {
    int rpta = 0;
    try {
      ResetToken rt = resetTokenService.findByToken(token);
      String claveHash = bCryptPasswordEncoder.encode(clave);
      rpta = loginService.cambiarClave(claveHash, rt.getUsuario().getUsername());
      resetTokenService.eliminar(rt);
    } catch (Exception e) {
      return new ResponseEntity<Integer>(rpta, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<Integer>(rpta, HttpStatus.OK);
  }
}
