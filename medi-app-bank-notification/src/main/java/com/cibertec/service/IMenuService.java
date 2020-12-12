package com.cibertec.service;

import java.util.List;

import com.cibertec.model.Menu;

public interface IMenuService extends ICRUD<Menu>{
	
	List<Menu> listarMenuPorUsuario(String nombre);
}
