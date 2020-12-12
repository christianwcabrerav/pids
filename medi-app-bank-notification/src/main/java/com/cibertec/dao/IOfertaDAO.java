package com.cibertec.dao;

import com.cibertec.model.Oferta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOfertaDAO extends JpaRepository<Oferta, Integer> {
}
