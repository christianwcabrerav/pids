package com.cibertec.dao;

import com.cibertec.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUsuarioDAO extends JpaRepository<Usuario, Integer> {

  // Convencion de busqueda de JpaRepository, nos ahorramos el @Query
  // Username viene de 'username' que es el atributo que hemos definido en el modelo 'usuario'
  Usuario findOneByUsername(String username);
}
