package project.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.shop.exception.DoesNotExistException;
import project.shop.exception.PermissionException;
import project.shop.model.Product;
import project.shop.repository.CartRepository;
import project.shop.repository.OrdersRepository;
import project.shop.repository.ProductRepository;
import project.shop.repository.UserRepository;

import java.util.List;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private CartRepository cartRepository;

    public void addProduct(UUID userId, Product product) throws DoesNotExistException, PermissionException {
        var foundUser = userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));
        if (!foundUser.getRole().equals("Admin")) {
            throw new PermissionException("User does not have privileges");
        }
        productRepository.save(product);
    }

    public List<Product> getProducts() {
        return productRepository.findProducts();
    }

    public void deleteProduct(UUID userId, UUID productId) throws DoesNotExistException, PermissionException {
        var foundUser = userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));
        if (!foundUser.getRole().equals("Admin")) {
            throw new PermissionException("User does not have privileges");
        }

        var foundProduct = productRepository.findById(productId).orElseThrow(() -> new DoesNotExistException("Product does not exist"));

        ordersRepository.deleteAll(ordersRepository.findByProduct_id(foundProduct.getId()));
        cartRepository.deleteAll(cartRepository.findByProduct_id(foundProduct.getId()));

        productRepository.delete(foundProduct);
    }

    public void editProduct(UUID userId, Product product) throws DoesNotExistException, PermissionException {
        var foundUser = userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));
        if (!foundUser.getRole().equals("Admin")) {
            throw new PermissionException("User does not have privileges");
        }
        productRepository.findById(product.getId()).orElseThrow(() -> new DoesNotExistException("Product does not exist"));

        productRepository.save(product);
    }

    public Product detailProduct(UUID userId,  UUID productId) throws DoesNotExistException, PermissionException {
        userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));
        return productRepository.findById(productId).orElseThrow(() -> new DoesNotExistException("Product does not exist"));
    }

    public List<Product> search(UUID userId, String query) throws DoesNotExistException {
        userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));

        if (query.isEmpty()) {
            return List.of();
        }

        return productRepository.findByNameContains(query);
    }
}
