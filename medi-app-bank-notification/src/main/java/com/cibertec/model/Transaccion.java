package com.cibertec.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import java.time.LocalDateTime;
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
@Table(name = "transaccion")
public class Transaccion {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer idTransaccion;

  @Column(name = "monto", nullable = false)
  private double monto;

  @Column(name = "moneda", nullable = false)
  private String moneda;

  @JsonSerialize(using = ToStringSerializer.class) //Para que en el json se represente en formato ISO
  private LocalDateTime fechaOperacion; //A partir de java8

  @ManyToOne
  @JoinColumn(name = "id_tipo_transaccion", nullable = false)
  private TipoTransaccion tipoTransaccion;

  @ManyToOne
  @JoinColumn(name = "id_cuenta_origen", nullable = false)
  private CuentaBancaria cuentaOrigen;

  @ManyToOne
  @JoinColumn(name = "id_cuenta_destino", nullable = false)
  private CuentaBancaria cuentaDestino;

}
