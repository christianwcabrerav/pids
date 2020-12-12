package com.cibertec.service.impl;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class RestAuthService {

  public boolean hasAccess(String path) {
    boolean result = false;

    String metodoRol = "";

    // Imaginamos que estamos trayendo desde base de datos los valores del switch
    // path : Puede venir de BD. Ejemplo
    switch (path) {
      case "listar":
        metodoRol = "ADMIN";
        break;
      case "listarId":
        metodoRol = "ADMIN,USER,DBA";
        break;
    }

    // Controlador/metodos # Este sera a un nivel bien detallado en Base de Datos.
    String metodoRoles[] = metodoRol.split(",");

    // Para obtener el usuario que se ha autenticado con el token
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    // Cabe recalcar que Spring Security tambien te permite autenticar de forma anonima
    if (!(authentication instanceof AnonymousAuthenticationToken)) {

      // Obtenemos los roles del usuario autenticado
      System.out.println(authentication.getAuthorities());

      for (GrantedAuthority authority : authentication.getAuthorities()) {
        String rolUser = authority.getAuthority();
        for (String rolMet : metodoRoles) {
          if (rolUser.equalsIgnoreCase(rolMet)) {
            result = true;
          }
        }
      }
    }
    return result;
  }

}
