package com.cibertec.controller;

import com.cibertec.model.Menu;
import com.cibertec.service.IMenuService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/menus")
public class MenuController {

  private final IMenuService service;

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<Menu>> listar() {
    List<Menu> menues;
    menues = service.listar();
    return new ResponseEntity<>(menues, HttpStatus.OK);
  }

  @PostMapping(value = "/usuario", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<Menu>> listar(@RequestBody String nombre) {
    List<Menu> menues;
    menues = service.listarMenuPorUsuario(nombre);
    return new ResponseEntity<>(menues, HttpStatus.OK);
  }
}
