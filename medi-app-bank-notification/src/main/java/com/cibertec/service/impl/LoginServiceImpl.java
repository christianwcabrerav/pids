package com.cibertec.service.impl;

import com.cibertec.dao.ILoginDAO;
import com.cibertec.model.Usuario;
import com.cibertec.service.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginServiceImpl implements ILoginService{
	
	@Autowired
	private ILoginDAO dao;

	@Override
	public int cambiarClave(String clave, String nombre) {
		int rpta = 0;
		try {
			dao.cambiarClave(clave, nombre);
			rpta = 1;
		} catch (Exception e) {
			rpta = 0;
		}
		return rpta;
	}
	
	@Override
	public Optional<Usuario> verificarNombreUsuario(String usuario) throws Exception {
		return Optional.ofNullable(dao.verificarNombreUsuario(usuario));
	}
}
