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
@Table(name = "notificacion")
public class Notificacion {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer idNotificacion;

  @Column(name = "descripcion", nullable = false)
  private String descripcion;

  @JsonSerialize(using = ToStringSerializer.class) //Para que en el json se represente en formato ISO
  private LocalDateTime fechaNotificacion; //A partir de java8

  @Column(name = "activo", nullable = false)
  private Boolean activo;

  @ManyToOne
  @JoinColumn(name = "id_tipo_notificacion", nullable = false)
  private TipoNotificacion tipoNotificacion;

  @ManyToOne
  @JoinColumn(name = "id_usuario", nullable = false)
  private Usuario usuario;

}
