package com.cibertec.dao;

import com.cibertec.model.TipoTransaccion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITipoTransaccionDAO extends JpaRepository<TipoTransaccion, Integer> {
}
