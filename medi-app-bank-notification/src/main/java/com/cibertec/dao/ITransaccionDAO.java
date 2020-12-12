package com.cibertec.dao;

import com.cibertec.model.Transaccion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITransaccionDAO extends JpaRepository<Transaccion, Integer> {
}
