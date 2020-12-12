package com.cibertec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;


/**
 * Esta clase me va a permitir controlar los recursos de accesos a mi aplicacion.
 * Me va a permitir de acuerdo al token saber que rutas estan permitidas en mi aplicacion,
 * saber que rutas necesitan autenticacion.
 */
@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

  // Injectamos el bean DefaultTokenServices que definimos en SecurityConfig
  @Autowired
  private ResourceServerTokenServices tokenServices;

  @Value("${security.jwt.resource-ids}")
  private String resourceIds;

  @Override
  public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
    // Indico el nombre  donde se van a generar mis JWT, y el mecanismo proveedor de tokens.
    resources.resourceId(resourceIds).tokenServices(tokenServices);
  }

  /**
   * En este metodo definimos las rutas que necesitan estar autenticadas.
   * Estamos protegiendo las rutas de mi aplicacion, es decir para acceder a ellas se necesita
   * estar debidamente autenticado.
   *
   * @param http
   * @throws Exception
   */
  @Override
  public void configure(HttpSecurity http) throws Exception {
    http
        .exceptionHandling().authenticationEntryPoint(new AuthException())
        .and()
        .requestMatchers()
        .and()
        .authorizeRequests()
        //.antMatchers("/v2/api-docs/**").authenticated()
        .antMatchers("/consultas/**").authenticated()
        .antMatchers("/especialidades/**").authenticated()
        .antMatchers("/examenes/**").authenticated()
        .antMatchers("/medicos/**").authenticated()
        .antMatchers("/menus/**").authenticated()
        .antMatchers("/consultaexamenes/**").authenticated()
        .antMatchers("/pacientes/**").authenticated()
        .antMatchers("/notificaciones/**").authenticated()
        .antMatchers("/cuentas**").authenticated()
        .antMatchers("/transactions/**").authenticated()
    ;
  }

}
