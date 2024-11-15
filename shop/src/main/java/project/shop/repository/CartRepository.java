package project.shop.repository;

import org.springframework.data.repository.CrudRepository;
import project.shop.model.Cart;

import java.util.List;
import java.util.UUID;

public interface CartRepository extends CrudRepository<Cart, UUID> {
    int countByUser_id(UUID User_id);
    List<Cart> findByUser_id(UUID User_id);
    Cart findFirstByUser_idAndProduct_id(UUID User_id, UUID Product_id);
    List<Cart> findByProduct_id(UUID Product_id);
}
