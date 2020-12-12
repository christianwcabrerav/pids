package com.cibertec.dao;

import com.cibertec.model.CuentaBancaria;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ICuentaBancariaDAO extends JpaRepository<CuentaBancaria, Integer> {
  @Query(value =
      "select cb.* from cuenta_bancaria cb inner join usuario u on cb.id_usuario = u.id_usuario where u.nombre = :nombreUsuario",
      nativeQuery=true)
  List<Object[]> listarPorNombreUsuario(@Param("nombreUsuario") String nombreUsuario);

  Optional<CuentaBancaria> findByNumeroCuenta(String numeroCuenta);

  Optional<CuentaBancaria> findByIdCuenta(Integer idCuenta);
}
