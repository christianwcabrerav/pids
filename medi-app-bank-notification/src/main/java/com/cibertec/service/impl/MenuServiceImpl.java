package com.cibertec.service.impl;

import com.cibertec.dao.IMenuDAO;
import com.cibertec.model.Menu;
import com.cibertec.service.IMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuServiceImpl implements IMenuService {

  @Autowired
  private IMenuDAO dao;

  @Override
  public Menu registrar(Menu menu) {
    return dao.save(menu);
  }

  @Override
  public Menu modificar(Menu menu) {
    return dao.save(menu);
  }

  @Override
  public void eliminar(int idMenu) {
    dao.delete(idMenu);
  }

  @Override
  public Menu listarId(int idMenu) {
    return dao.findOne(idMenu);
  }

  @Override
  public List<Menu> listar() {
    return dao.findAll();
  }

  @Override
  public List<Menu> listarMenuPorUsuario(String nombre) {
    return dao.listarMenuPorUsuario(nombre)
        .stream()
        .map(this::parseToMenus)
        .collect(Collectors.toList());
  }

  private Menu parseToMenus(Object[] objeto) {
    Menu menu = new Menu();
    menu.setIdMenu(Integer.parseInt(String.valueOf(objeto[0])));
    menu.setIcono(String.valueOf(objeto[1]));
    menu.setNombre(String.valueOf(objeto[2]));
    menu.setUrl(String.valueOf(objeto[3]));
    return menu;
  }
}
