package project.shop.repository;

import org.springframework.data.repository.CrudRepository;
import project.shop.model.User;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends CrudRepository<User, UUID>
{
    User findByName(String name);

    List<User> findByRole(String role);
}