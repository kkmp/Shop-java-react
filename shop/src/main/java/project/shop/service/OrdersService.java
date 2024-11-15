package project.shop.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.shop.exception.DoesNotExistException;
import project.shop.model.Cart;
import project.shop.model.Order;
import project.shop.model.Product;
import project.shop.model.dto.OrderDto;
import project.shop.model.dto.OrderPlaceDto;
import project.shop.repository.CartRepository;
import project.shop.repository.OrdersRepository;
import project.shop.repository.ProductRepository;
import project.shop.repository.UserRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrdersService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private ModelMapper modelMapper;

    public float orderNow(UUID userId) throws DoesNotExistException {
        var foundUser = userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));

        var foundCards = cartRepository.findByUser_id(foundUser.getId());

        float totalPrice = 0.0f;

        for (Cart cart : foundCards) {
            Product product = cart.getProduct();
            totalPrice += product.getPrice();
        }
        return totalPrice;
    }

    public void orderPlace(UUID userId, OrderPlaceDto order) throws DoesNotExistException {
        var foundUser = userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));

        var foundCards = cartRepository.findByUser_id(foundUser.getId());

        if (!foundCards.isEmpty()) {
            for (Cart cart : foundCards) {
                Order newOrder = modelMapper.map(order, Order.class);

                newOrder.setProduct(cart.getProduct());
                newOrder.setUser(foundUser);
                newOrder.setStatus("w trakcie");
                newOrder.setPaymentStatus("w trakcie");

                ordersRepository.save(newOrder);
                cartRepository.delete(cart);
            }
        }
    }

    public List<OrderDto> myOrders(UUID userId) throws DoesNotExistException {
        var foundUser = userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));

        return ordersRepository.findByUser_id(foundUser.getId())
                .stream()
                .map(order -> modelMapper.map(order, OrderDto.class))
                .collect(Collectors.toList());
    }
}
