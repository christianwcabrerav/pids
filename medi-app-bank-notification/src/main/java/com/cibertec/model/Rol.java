package com.cibertec.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "rol")
public class Rol {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer idRol;

  @Column(name = "nombre", nullable = false)
  private String nombre;

  @Column(name = "descripcion")
  private String descripcion;

}
