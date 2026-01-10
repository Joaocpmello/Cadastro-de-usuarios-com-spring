package com.seuprojeto.cadastro.controller;

import com.seuprojeto.cadastro.model.Usuario;
import com.seuprojeto.cadastro.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public Usuario cadastrar(@RequestBody Usuario usuario){
        return usuarioService.salvar(usuario);
    }

    @GetMapping
    public List<Usuario> listar(){
        return usuarioService.listarTodos();
    }
}
