//package com.mitocode.dto;
//
//import com.fasterxml.jackson.databind.JsonSerializer;
//import com.fasterxml.jackson.databind.annotation.JsonSerialize;
//
//import java.time.LocalDateTime;
//
//public class FiltroConsultaDTO {
//
//  private String dni;
//  private String nombreCompleto;
//
//  @JsonSerialize(using = JsonSerializer.class) // Para que tenga el formato ISO y usamos LocalDateTime
//  private LocalDateTime fechaConsulta;
//
//  public String getDni() {
//    return dni;
//  }
//
//  public void setDni(String dni) {
//    this.dni = dni;
//  }
//
//  public String getNombreCompleto() {
//    return nombreCompleto;
//  }
//
//  public void setNombreCompleto(String nombreCompleto) {
//    this.nombreCompleto = nombreCompleto;
//  }
//
//  public LocalDateTime getFechaConsulta() {
//    return fechaConsulta;
//  }
//
//  public void setFechaConsulta(LocalDateTime fechaConsulta) {
//    this.fechaConsulta = fechaConsulta;
//  }
//}
