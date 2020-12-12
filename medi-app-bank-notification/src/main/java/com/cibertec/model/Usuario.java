package com.cibertec.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "usuario")
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer idUsuario;

  @Column(name = "nombre", nullable = false, unique = true)
  private String username;

  @Column(name = "clave", nullable = false)
  private String password;

  @Column(name = "estado", nullable = false)
  private boolean enabled;

  // Con EAGER nos traemos todos los roles cuando nos traemos al usuario
  @ManyToMany(fetch = FetchType.EAGER)
  // Referenciamos las llaves foraneas de ambas tablas
  @JoinTable(name = "usuario_rol", joinColumns = @JoinColumn(name = "id_usuario", referencedColumnName = "idUsuario"),
          inverseJoinColumns = @JoinColumn(name = "id_rol", referencedColumnName = "idRol"))
  private List<Rol> rolList;
}
