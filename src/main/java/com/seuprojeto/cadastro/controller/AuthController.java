package com.seuprojeto.cadastro.controller;

import com.seuprojeto.cadastro.model.Usuario;
import com.seuprojeto.cadastro.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.seuprojeto.cadastro.security.JwtService;


import java.util.Map;

@RestController
public class AuthController {

    private final UsuarioService usuarioService;
    private final JwtService jwtService;

    public AuthController(UsuarioService usuarioService, JwtService jwtService) {
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> dados) {
        String email = dados.get("email");
        String senha = dados.get("senha");

        Usuario usuario = usuarioService.autenticar(email, senha);

        String token = jwtService.gerarToken(usuario.getEmail());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "tipo", "Bearer"
        ));
    }
}
