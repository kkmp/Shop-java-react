package project.shop.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import project.shop.config.JwtTokenUtil;
import project.shop.exception.DoesNotExistException;
import project.shop.exception.PasswordsNotTheSameException;
import project.shop.exception.PermissionException;
import project.shop.exception.UserAlreadyExists;
import project.shop.model.JwtRequest;
import project.shop.model.JwtResponse;
import project.shop.model.User;
import project.shop.model.dto.UserDto;
import project.shop.service.JwtUserDetailsService;
import project.shop.service.ValidationService;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class JwtAuthenticationController extends BaseController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService userDetailsService;

    @PostMapping("authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {
        authenticate(authenticationRequest.getName(), authenticationRequest.getPassword());
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getName());
        final User user = userDetailsService.getUser(authenticationRequest.getName());
        final String token = jwtTokenUtil.generateToken(user);
        return ResponseEntity.ok(new JwtResponse(token));
    }
    @PostMapping("register")
    public ResponseEntity<?> saveUser(@Valid @RequestBody UserDto user, BindingResult bindingResult) throws PasswordsNotTheSameException, UserAlreadyExists {
        var validationResult = validationService.handleBindingResultErrors(bindingResult);
        if (!validationResult.isEmpty()) {
            return new ResponseEntity<>(validationResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(userDetailsService.save(user));
    }

    @GetMapping("showUsers")
    public ResponseEntity<?> showUsers(@AuthenticationPrincipal UserDetails userDetails) throws PermissionException, DoesNotExistException {
            return ResponseEntity.ok(userDetailsService.showUsers(userDetailsService.getUser(userDetails.getUsername()).getId()));
    }

    @DeleteMapping("deleteUser/{userToDeleteId}")
    public ResponseEntity<?> deleteUser(@PathVariable UUID userToDeleteId, @AuthenticationPrincipal UserDetails userDetails) throws PermissionException, DoesNotExistException {
            userDetailsService.deleteUser(
                    userDetailsService.getUser(userDetails.getUsername()).getId(),
                    userToDeleteId);
            return ResponseEntity.ok("User deleted");
    }

    private void authenticate(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }
}