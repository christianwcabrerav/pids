package com.cibertec.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import java.time.LocalDateTime;
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
@Table(name = "oferta")
public class Oferta {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer idOferta;

  @ManyToOne
  @JoinColumn(name = "id_tipo_oferta", nullable = false)
  private TipoOferta tipoOferta;

  @ManyToOne
  @JoinColumn(name = "id_usuario", nullable = false)
  private Usuario usuario;

  @JsonSerialize(using = ToStringSerializer.class) //Para que en el json se represente en formato ISO
  private LocalDateTime fechaRegistro; //A partir de java8
}
