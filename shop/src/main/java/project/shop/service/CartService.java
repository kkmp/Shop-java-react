package project.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.shop.exception.DoesNotExistException;
import project.shop.exception.PermissionException;
import project.shop.model.Cart;
import project.shop.model.Product;
import project.shop.repository.CartRepository;
import project.shop.repository.ProductRepository;
import project.shop.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CartService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    public void addToCart(UUID userId, UUID productId) throws DoesNotExistException, PermissionException {
        var foundUser = userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));
        var foundProduct = productRepository.findById(productId).orElseThrow(() -> new DoesNotExistException("Product does not exist"));

        Cart newCart = new Cart();
        newCart.setUser(foundUser);
        newCart.setProduct(foundProduct);
        cartRepository.save(newCart);
    }

    public int cartItem(UUID userId) throws DoesNotExistException {
        var foundUser = userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));
        return cartRepository.countByUser_id(foundUser.getId());
    }

    public List<Product> cartList(UUID userId) throws DoesNotExistException {
        var foundUser = userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));
        var foundCarts = cartRepository.findByUser_id(foundUser.getId());

        List<Product> productList = new ArrayList<>();

        for (Cart userCart : foundCarts) {
            Product product = userCart.getProduct();
            productList.add(product);
        }

        return productList;
    }

    public void removeFromCart(UUID userId, UUID productId) throws DoesNotExistException, PermissionException {
        var foundUser = userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));
        productRepository.findById(productId).orElseThrow(() -> new DoesNotExistException("Product does not exist"));

        var foundCart = cartRepository.findFirstByUser_idAndProduct_id(foundUser.getId(), productId);

        if (foundCart == null) {
            throw new DoesNotExistException("Product does not exist in the cart");
        }
        cartRepository.delete(foundCart);
    }
}
