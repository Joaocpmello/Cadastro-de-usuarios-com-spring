package com.seuprojeto.cadastro.controller;

import com.seuprojeto.cadastro.model.Usuario;
import com.seuprojeto.cadastro.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario){
        try {
            Usuario salvo = usuarioService.salvar(usuario);
            return ResponseEntity.ok(salvo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Usuario> listar(){
        return usuarioService.listarTodos();
    }
}
