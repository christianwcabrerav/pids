package com.cibertec.service;

import com.cibertec.model.Usuario;

import java.util.Optional;

public interface ILoginService {

	Optional<Usuario> verificarNombreUsuario(String usuario) throws Exception;
	int cambiarClave(String clave, String nombre) throws Exception;

}
