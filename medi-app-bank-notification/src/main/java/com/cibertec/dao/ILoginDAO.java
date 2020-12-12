package com.cibertec.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.cibertec.model.Usuario;

public interface ILoginDAO extends JpaRepository<Usuario, Integer>  {

	/**
	 * Este metoodo va a verificar que el usuario(correo) exista para poder cambiar la clave.
	 * @param usuario
	 * @return
	 * @throws Exception
	 */
	@Query("FROM Usuario us where us.username = :usuario")
	Usuario verificarNombreUsuario(@Param("usuario") String usuario) throws Exception;

	/**
	 * Este metodo permite cambiar el password del usuario.
	 * @param clave
	 * @param nombre
	 * @throws Exception
	 */
	@Transactional
	@Modifying
	@Query("UPDATE Usuario us SET us.password = :clave WHERE us.username = :nombre")
	void cambiarClave(@Param("clave") String clave, @Param("nombre") String nombre) throws Exception;
	
}
