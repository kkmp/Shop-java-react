package project.shop.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import project.shop.exception.DoesNotExistException;
import project.shop.model.dto.OrderPlaceDto;
import project.shop.service.JwtUserDetailsService;
import project.shop.service.OrdersService;

@CrossOrigin
@RestController
@RequestMapping("/api/orders")
public class OrdersController extends BaseController {
    @Autowired
    private OrdersService ordersService;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @GetMapping("orderNow")
    public ResponseEntity<?> orderNow(@AuthenticationPrincipal UserDetails userDetails) throws DoesNotExistException {
        return ResponseEntity.ok(ordersService.orderNow(jwtUserDetailsService.getUser(userDetails.getUsername()).getId()));
    }

    @PostMapping("orderPlace")
    public ResponseEntity<?> orderPlace(@Valid @RequestBody OrderPlaceDto model, BindingResult bindingResult, @AuthenticationPrincipal UserDetails userDetails) throws DoesNotExistException {
        var validationResult = validationService.handleBindingResultErrors(bindingResult);
        if (!validationResult.isEmpty()) {
            return new ResponseEntity<>(validationResult, HttpStatus.BAD_REQUEST);
        }
            ordersService.orderPlace(
                    jwtUserDetailsService.getUser(userDetails.getUsername()).getId(),
                    model);
            return ResponseEntity.ok("Order placed");
    }

    @GetMapping("myOrders")
    public ResponseEntity<?> myOrders(@AuthenticationPrincipal UserDetails userDetails) throws DoesNotExistException {
        return ResponseEntity.ok(ordersService.myOrders(jwtUserDetailsService.getUser(userDetails.getUsername()).getId()));
    }
}
