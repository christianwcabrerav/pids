//package com.cibertec;
//
//import com.cibertec.dao.IUsuarioDAO;
//import com.cibertec.model.Usuario;
//import org.junit.Assert;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.test.context.junit4.SpringRunner;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//public class MediappBackendApplicationTests {
//
//  @Autowired
//  private IUsuarioDAO usuarioDAO;
//
//  @Autowired
//  private BCryptPasswordEncoder bCryptPasswordEncoder;
//
//  /**
//   * Este metodo va a probar que el password con el que creamos un usuario es el mismo
//   * que el password que me retorna el metodo save al persistirlo en la BD.
//   */
//  @Test
//  public void crearUsuarioAdmin() {
//    Usuario usuario = new Usuario();
//    usuario.setIdUsuario(1);
//    usuario.setUsername("admin@gmail.com");
//    usuario.setPassword(bCryptPasswordEncoder.encode("123"));
//    usuario.setEnabled(true);
//
//    Usuario usuarioSave = usuarioDAO.save(usuario);
//    Assert.assertTrue(usuarioSave.getPassword().equalsIgnoreCase(usuario.getPassword()));
//  }
//  @Test
//  public void crearUsuarioSimple1() {
//    Usuario usuario = new Usuario();
//    usuario.setIdUsuario(2);
//    usuario.setUsername("juan.1996.jb65@gmail.com");
//    usuario.setPassword(bCryptPasswordEncoder.encode("123"));
//    usuario.setEnabled(true);
//
//    Usuario usuarioSave = usuarioDAO.save(usuario);
//    Assert.assertTrue(usuarioSave.getPassword().equalsIgnoreCase(usuario.getPassword()));
//  }
//
//  @Test
//  public void crearUsuarioSimple2() {
//    Usuario usuario = new Usuario();
//    usuario.setIdUsuario(3);
//    usuario.setUsername("maria@gmail.com");
//    usuario.setPassword(bCryptPasswordEncoder.encode("123"));
//    usuario.setEnabled(true);
//
//    Usuario usuarioSave = usuarioDAO.save(usuario);
//    Assert.assertTrue(usuarioSave.getPassword().equalsIgnoreCase(usuario.getPassword()));
//  }
//
//  @Test
//  public void crearUsuarioSimple3() {
//    Usuario usuario = new Usuario();
//    usuario.setIdUsuario(4);
//    usuario.setUsername("diana@gmail.com");
//    usuario.setPassword(bCryptPasswordEncoder.encode("123"));
//    usuario.setEnabled(true);
//
//    Usuario usuarioSave = usuarioDAO.save(usuario);
//    Assert.assertTrue(usuarioSave.getPassword().equalsIgnoreCase(usuario.getPassword()));
//  }
//}
