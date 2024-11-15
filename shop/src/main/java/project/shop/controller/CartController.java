package project.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import project.shop.exception.DoesNotExistException;
import project.shop.exception.PermissionException;
import project.shop.service.CartService;
import project.shop.service.JwtUserDetailsService;

import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/cart")
public class CartController extends BaseController {
    @Autowired
    private CartService cartService;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @PostMapping("addToCart")
    public ResponseEntity<?> addProduct(@RequestBody UUID productId, @AuthenticationPrincipal UserDetails userDetails) throws PermissionException, DoesNotExistException {
            cartService.addToCart(
                    jwtUserDetailsService.getUser(userDetails.getUsername()).getId(),
                    productId);
            return ResponseEntity.ok("Product added to the cart");
    }

    @GetMapping("cartItem")
    public ResponseEntity<?> cartItem(@AuthenticationPrincipal UserDetails userDetails) throws DoesNotExistException {
            return ResponseEntity.ok(cartService.cartItem(jwtUserDetailsService.getUser(userDetails.getUsername()).getId()));
    }

    @GetMapping("cartList")
    public ResponseEntity<?> cartList(@AuthenticationPrincipal UserDetails userDetails) throws DoesNotExistException {
            return ResponseEntity.ok(cartService.cartList(jwtUserDetailsService.getUser(userDetails.getUsername()).getId()));
    }

    @DeleteMapping("removeFromCart/{productId}")
    public ResponseEntity<?> removeFromCart(@PathVariable UUID productId, @AuthenticationPrincipal UserDetails userDetails) throws PermissionException, DoesNotExistException {
            cartService.removeFromCart(
                    jwtUserDetailsService.getUser(userDetails.getUsername()).getId(),
                    productId);
            return ResponseEntity.ok("Product removed form the cart");
    }
}
