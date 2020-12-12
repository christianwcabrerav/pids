package com.cibertec.service.impl;

import com.cibertec.dao.IUsuarioDAO;
import com.cibertec.dto.api.response.UsuarioResponse;
import com.cibertec.model.Usuario;
import com.cibertec.service.IUsuarioService;
import com.cibertec.util.mappers.UsuarioMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service("userDetailsService")
public class UserServiceImpl implements UserDetailsService, IUsuarioService {


  private final IUsuarioDAO userDAO;
  private final UsuarioMapper usuarioMapper;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Usuario user = userDAO.findOneByUsername(username); //from usuario where username := username

    if (user == null) {
      throw new UsernameNotFoundException(String.format("Usuario no existe", username));
    }

    // GrantedAuthority es la clase que representa los roles en SpringSecurity
    List<GrantedAuthority> authorities = new ArrayList<>();

    // Para cada rol del usuario voy a llenar el List de Authorities
    // De esta manera le pasamos los roles a SpringSecurity
    user.getRolList().forEach(role -> {
      authorities.add(new SimpleGrantedAuthority(role.getNombre()));
    });

    UserDetails userDetails = new User(user.getUsername(), user.getPassword(), authorities);

    return userDetails;
  }

  @Override
  public List<UsuarioResponse> listar() {
    return userDAO.findAll().stream()
        .map(this.usuarioMapper::buildUsuarioResponse)
        .collect(Collectors.toList());
  }
}
