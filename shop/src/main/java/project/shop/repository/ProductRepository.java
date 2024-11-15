package project.shop.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import project.shop.model.Product;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends CrudRepository<Product, UUID> {
    @Query("select p from Product p")
    List<Product> findProducts();

    @Query("select e from Product e where name LIKE CONCAT('%', :name, '%') ")
    List<Product> findByNameContains(@Param("name") String name);
}
