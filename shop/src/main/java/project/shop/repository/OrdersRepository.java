package project.shop.repository;

import org.springframework.data.repository.CrudRepository;
import project.shop.model.Order;

import java.util.List;
import java.util.UUID;

public interface OrdersRepository extends CrudRepository<Order, UUID> {
    List<Order> findByUser_id(UUID User_id);
    List<Order> findByProduct_id(UUID Product_id);
}
