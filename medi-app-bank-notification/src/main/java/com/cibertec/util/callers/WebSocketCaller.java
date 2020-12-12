package com.cibertec.util.callers;

import com.cibertec.proxy.model.WebSocketRequest;
import com.cibertec.proxy.model.WebSocketResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class WebSocketCaller {

  @Value( "${websocket.server.url}" )
  private String serverSocketUrl;

  public WebSocketResponse enviarNotificacion(WebSocketRequest request) {
    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<WebSocketRequest> httpEntity = new HttpEntity<>(request);
    String url = serverSocketUrl + "/notificacion";
    return restTemplate.postForObject(url, request, WebSocketResponse.class);
  }
}
