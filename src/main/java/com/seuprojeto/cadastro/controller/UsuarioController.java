package com.seuprojeto.cadastro.controller;

import com.seuprojeto.cadastro.dto.LoginRequest;
import com.seuprojeto.cadastro.model.Usuario;
import com.seuprojeto.cadastro.security.JwtService;
import com.seuprojeto.cadastro.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final JwtService jwtService;

    public UsuarioController(UsuarioService usuarioService, JwtService jwtService){
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@Valid @RequestBody Usuario usuario){
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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        try {
            usuarioService.excluir(id);
            return ResponseEntity.ok("Usuário excluído com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authorization,
            @RequestBody Usuario usuario
    ) {
        try {
            Usuario atualizado = usuarioService.atualizarPorId(id, usuario);
            return ResponseEntity.ok(atualizado);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Usuario usuario = usuarioService.buscarPorEmail(loginRequest.getEmail());

        if(!usuario.getSenha().equals(loginRequest.getSenha())) {
            return ResponseEntity.badRequest().body("Email ou senha inválidos");
        }

        String token = jwtService.gerarToken(usuario.getEmail());

        return ResponseEntity.ok(token);
    }
}
