//package com.cibertec.model;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.Table;
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//@Entity
//@Table(name = "tarjeta_credito")
//public class TarjetaCredito {
//  @Id
//  @GeneratedValue(strategy = GenerationType.AUTO)
//  private Integer idTarjetaCredito;
//
//  @Column(name = "numero_cuenta", unique = true, nullable = false)
//  private String numeroCuenta;
//
//  @Column(name = "moneda", nullable = false)
//  private String moneda;
//
//  @Column(name = "saldo", nullable = false)
//  private double saldo;
//
//  @Column(name = "activado", nullable = false)
//  private boolean activado;
//
//  @ManyToOne
//  @JoinColumn(name = "id_usuario", nullable = false)
//  private Usuario usuario;
//}
