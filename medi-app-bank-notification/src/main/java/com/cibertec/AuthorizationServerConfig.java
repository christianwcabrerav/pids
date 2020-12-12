package com.cibertec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

import java.util.Arrays;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

  @Value("${security.jwt.client-id}")
  private String clientId;

  @Value("${security.jwt.client-secret}")
  private String clientSecret;

  @Value("${security.jwt.grant-type}")
  private String grantType;

  @Value("${security.jwt.scope-read}")
  private String scopeRead;

  @Value("${security.jwt.scope-write}")
  private String scopeWrite = "write";

  @Value("${security.jwt.resource-ids}")
  private String resourceIds;

  @Value("${security.jwt.token.validaty.seconds}")
  private int timeSecondsTokenExpiration;

  @Autowired
  private TokenStore tokenStore;

  @Autowired
  private JwtAccessTokenConverter accessTokenConverter;

  @Autowired
  private AuthenticationManager authenticationManager;

  /**
   * Metodo para la generacion del token.
   * accessTokenValiditySeconds: Tiempo de vida del token.
   * refreshTokenValiditySeconds(0): Cuando muere el token en Angular voy a pedir al usuario, osea voy a
   * redireccionarlo al login para que el backend le asigne un nuevo token.
   *
   * @param configurer
   * @throws Exception
   */
  @Override
  public void configure(ClientDetailsServiceConfigurer configurer) throws Exception {
    configurer.inMemory()
        .withClient(clientId)
        .secret(clientSecret)
        .authorizedGrantTypes(grantType)
        .scopes(scopeRead, scopeWrite)
        .resourceIds(resourceIds)
        .accessTokenValiditySeconds(timeSecondsTokenExpiration)
        // Cuando muere el token en angular voy a pedir al usuario que vuelva a iniciar sesion
        // y el backend le asigne un nuevo token
        .refreshTokenValiditySeconds(0);
  }

  /**
   * Metodo para la generacion del token con los beans que se definieron
   * en los otros archivos Configuration.
   */
  @Override
  public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
    TokenEnhancerChain enhancerChain = new TokenEnhancerChain();
    enhancerChain.setTokenEnhancers(Arrays.asList(accessTokenConverter));
    endpoints.tokenStore(tokenStore)
        .accessTokenConverter(accessTokenConverter)
        .tokenEnhancer(enhancerChain)
        .authenticationManager(authenticationManager);
  }

}
