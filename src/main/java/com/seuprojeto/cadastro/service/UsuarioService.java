package com.seuprojeto.cadastro.service;

import com.seuprojeto.cadastro.model.Usuario;
import com.seuprojeto.cadastro.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario salvar(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarTodos(){
        return usuarioRepository.findAll();
    }
}
