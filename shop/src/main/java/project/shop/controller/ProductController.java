package project.shop.controller;

import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import project.shop.exception.DoesNotExistException;
import project.shop.exception.PermissionException;
import project.shop.model.Product;
import project.shop.model.dto.ProductDto;
import project.shop.model.dto.ProductEditDto;
import project.shop.service.JwtUserDetailsService;
import project.shop.service.ProductService;

import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/product")
public class ProductController extends BaseController {
    @Autowired
    private ProductService productService;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("addProduct")
    public ResponseEntity<?> addProduct(@Valid @RequestBody ProductDto model, BindingResult bindingResult, @AuthenticationPrincipal UserDetails userDetails) throws PermissionException, DoesNotExistException {
        var validationResult = validationService.handleBindingResultErrors(bindingResult);
        if (!validationResult.isEmpty()) {
            return new ResponseEntity<>(validationResult, HttpStatus.BAD_REQUEST);
        }
            productService.addProduct(
                    jwtUserDetailsService.getUser(userDetails.getUsername()).getId(),
                    modelMapper.map(model, Product.class));
            return ResponseEntity.ok("Product added");
    }

    @GetMapping("index")
    public ResponseEntity<?> index() {
        return ResponseEntity.ok(productService.getProducts());
    }

    @DeleteMapping("removeProduct/{idProduct}")
    public ResponseEntity<?> removeProduct(@PathVariable UUID idProduct, @AuthenticationPrincipal UserDetails userDetails) throws PermissionException, DoesNotExistException {
            productService.deleteProduct(
                    jwtUserDetailsService.getUser(userDetails.getUsername()).getId(),
                    idProduct);
            return ResponseEntity.ok("Product removed");
    }

    @PutMapping("editProduct")
    public ResponseEntity<?> editProduct(@Valid @RequestBody ProductEditDto model, BindingResult bindingResult, @AuthenticationPrincipal UserDetails userDetails) throws PermissionException, DoesNotExistException {
        var validationResult = validationService.handleBindingResultErrors(bindingResult);
        if (!validationResult.isEmpty()) {
            return new ResponseEntity<>(validationResult, HttpStatus.BAD_REQUEST);
        }
            productService.editProduct(
                    jwtUserDetailsService.getUser(userDetails.getUsername()).getId(),
                    modelMapper.map(model, Product.class));
            return ResponseEntity.ok("Product edited");
    }

    @GetMapping("detail/{productId}")
    public ResponseEntity<?> detail(@PathVariable UUID productId, @AuthenticationPrincipal UserDetails userDetails) throws PermissionException, DoesNotExistException {
            return ResponseEntity.ok(productService.detailProduct(
                    jwtUserDetailsService.getUser(userDetails.getUsername()).getId(),
                    productId));
    }

    @GetMapping("search/{query}")
    public ResponseEntity<?> search(@PathVariable String query, @AuthenticationPrincipal UserDetails userDetails) throws DoesNotExistException {
            return ResponseEntity.ok(productService.search(
                    jwtUserDetailsService.getUser(userDetails.getUsername()).getId(),
                    query));
    }
}
