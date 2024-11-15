package project.shop.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.shop.exception.DoesNotExistException;
import project.shop.exception.PasswordsNotTheSameException;
import project.shop.exception.PermissionException;
import project.shop.exception.UserAlreadyExists;
import project.shop.model.User;
import project.shop.model.dto.UserDataDto;
import project.shop.model.dto.UserDto;
import project.shop.repository.CartRepository;
import project.shop.repository.OrdersRepository;
import project.shop.repository.UserRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByName(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(), new ArrayList<>());
    }

    public User save(UserDto user) throws UserAlreadyExists, PasswordsNotTheSameException {
        User foundUser = userRepository.findByName(user.getName());
        if (foundUser != null) {
            throw new UserAlreadyExists("User already exists");
        }
        if (!user.getPassword1().equals(user.getPassword2())) {
            throw new PasswordsNotTheSameException("The passwords are not the same");
        }

        User newUser = modelMapper.map(user, User.class);
        newUser.setPassword(bcryptEncoder.encode(user.getPassword1()));
        newUser.setRole("User");
        return userRepository.save(newUser);
    }

    public User getUser(String name) {
        return userRepository.findByName(name);
    }

    public List<UserDataDto> showUsers(UUID userId) throws DoesNotExistException, PermissionException {
        var foundUser = userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));
        if (!foundUser.getRole().equals("Admin")) {
            throw new PermissionException("User does not have privileges");
        }

        var usersList = userRepository.findByRole("User");

        return usersList
                .stream()
                .map(user -> modelMapper.map(user, UserDataDto.class))
                .collect(Collectors.toList());
    }

    public void deleteUser(UUID userId, UUID userToDeleteId) throws DoesNotExistException, PermissionException {
        var foundUser = userRepository.findById(userId).orElseThrow(() -> new DoesNotExistException("User does not exist"));
        if (!foundUser.getRole().equals("Admin")) {
            throw new PermissionException("User does not have privileges");
        }

        var foundUserToDelete = userRepository.findById(userToDeleteId).orElseThrow(() -> new DoesNotExistException("User to delete does not exist"));

        ordersRepository.deleteAll(ordersRepository.findByUser_id(userToDeleteId));
        cartRepository.deleteAll(cartRepository.findByUser_id(userToDeleteId));

        userRepository.delete(foundUserToDelete);
    }
}