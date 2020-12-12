package com.cibertec.dao;

import com.cibertec.model.Configuracion;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IConfiguracionDAO extends JpaRepository<Configuracion, Integer> {

  Optional<Configuracion> findByUsuario_Username(String username);

}
