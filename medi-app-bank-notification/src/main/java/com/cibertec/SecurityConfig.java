package com.cibertec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Value("${security.signing-key}")
  private String signingKey;

  @Value("${security.encoding-strength}")
  private Integer encodingStrength;

  @Value("${security.security-realm}")
  private String securityRealm;

  // Obteniendo una instancia de la conexion a la BD
  // Para traernos los usuarios que estan en la tabla usuarios
  @Autowired
  private DataSource dataSource;

  // Interfaz propia de Spring para poder definir los usuarios que estan cargados en la aplicacion
  // Implementamos una clase de esta interfaz que es UserServiceImpl con nuestra logica
  @Autowired
  private UserDetailsService userDetailsService;

  @Autowired
  private BCryptPasswordEncoder bcrypt;

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    return bCryptPasswordEncoder;
  }

  // Para saber el tema de los roles
  @Bean
  @Override
  protected AuthenticationManager authenticationManager() throws Exception {
    // Accedemos al metodo de la clase padre
    return super.authenticationManager();
  }

  // Injeccion  por metodo.
  // El parametro AuthenticationManagerBuilder es una instancia de AuthenticationManager
  @Autowired
  public void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService).passwordEncoder(bcrypt);
  }

  // Sobreescribimos segun la politica de seguridad que nosotros queremos para la aplicacion
  // Deshabilitamos el token porque lo vamos a generar con OAuth
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .sessionManagement()
        // Es Stateless porque no podemos guardar los estados en Angular
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .httpBasic()
        // Nombre de la aplicacion
        .realmName(securityRealm)
        .and()
        // Mecanismo de proteccion para evitar ataques en formularios con JS
        // Se utilizaba mucho en Spring MVC para generar token en un campo hidden
        // Lo deshabilitamos para que OAUTH se encargue de generar los token.
        .csrf()
        .disable();
  }

  @Bean
  public JwtAccessTokenConverter accessTokenConverter() {
    JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
    // Le pasamos el mecanismo de la firma
    converter.setSigningKey(signingKey);
    return converter;
  }

  @Bean
  public TokenStore tokenStore() {
    //return new JwtTokenStore(accessTokenConverter()); // Esto es en memoria
    return new JdbcTokenStore(this.dataSource); // El token se va a almacenar en BD
  }

  @Bean
  @Primary
  public DefaultTokenServices tokenServices() {
    DefaultTokenServices defaultTokenServices = new DefaultTokenServices();
    defaultTokenServices.setTokenStore(tokenStore());
    defaultTokenServices.setSupportRefreshToken(true);
    defaultTokenServices.setReuseRefreshToken(false);
    return defaultTokenServices;
  }
}
