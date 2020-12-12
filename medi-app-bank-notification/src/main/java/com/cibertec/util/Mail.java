package com.cibertec.util;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class Mail {

	/**
	 * Quien manda el correo
	 */
	private String from;

	/**
	 * Para quien va dirigido
	 */
	private String to;

	/**
	 * El asunto del correo
	 */
	private String subject;

	/**
	 * Clave-Valor que se va a usar en la plantilla de thymeleaf.
	 */
	private Map<String, Object> model;
}
