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
@Table(name = "tipo_notificacion")
public class TipoNotificacion {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer idTipoNotificacion;

  @Column(name = "descripcion", nullable = false)
  private String descripcion;
}
