package com.cibertec.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tipo_transaccion")
public class TipoTransaccion {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int idTipoTransaccion;

  @Column(name = "descripcion", nullable = false)
  private String descripcion;
}
