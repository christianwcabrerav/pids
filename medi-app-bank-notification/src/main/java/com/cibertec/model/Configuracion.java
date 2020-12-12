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
@Table(name = "configuracion")
public class Configuracion {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer idConfiguracion;

  @Column(name = "notificaciones", nullable = false)
  private boolean notificaciones;

  @Column(name = "recibir_transferencias", nullable = false)
  private boolean recibirTransferencias;

  @Column(name = "hacer_transferencias", nullable = false)
  private boolean hacerTransferencias;

  @ManyToOne
  @JoinColumn(name = "id_usuario", nullable = false)
  private Usuario usuario;

}
