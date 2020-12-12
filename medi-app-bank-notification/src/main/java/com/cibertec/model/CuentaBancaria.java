package com.cibertec.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cuenta_bancaria")
public class CuentaBancaria {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer idCuenta;

  @Column(name = "numero_cuenta", unique = true, nullable = false)
  private String numeroCuenta;

  @Column(name = "moneda", nullable = false)
  private String moneda;

  @Column(name = "saldo", nullable = false)
  private double saldo;

  @Column(name = "neutro")
  private boolean neutro; //

  @ManyToOne
  @JoinColumn(name = "id_usuario", nullable = false)
  private Usuario usuario;
}
