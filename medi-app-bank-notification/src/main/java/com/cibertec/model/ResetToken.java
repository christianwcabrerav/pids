package com.cibertec.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

@Entity
//https://memorynotfound.com/spring-security-forgot-password-send-email-reset-password/
public class ResetToken implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /**
   * Es la url que se va a generar, no confundir con el token de jwt
   */
  @Column(nullable = false, unique = true)
  private String token;

  @OneToOne(targetEntity = Usuario.class, fetch = FetchType.EAGER)
  @JoinColumn(nullable = false, name = "id_usuario")
  private Usuario user;

  @Column(nullable = false)
  private Date expiracion;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public Usuario getUsuario() {
    return user;
  }

  public void setUsuario(Usuario user) {
    this.user = user;
  }

  public Date getExpiracion() {
    return expiracion;
  }

  public void setExpiracion(Date expiracion) {
    this.expiracion = expiracion;
  }

  public void setExpiracion(int minutes) {
    Calendar now = Calendar.getInstance();
    now.add(Calendar.MINUTE, minutes);
    this.expiracion = now.getTime();
  }

  public boolean isExpirado() {
    return new Date().after(this.expiracion);
  }
}
