package project.shop.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    @NotNull
    @Size(min = 3, max = 25, message = "Name must be between 3 and 25 characters")
    @Pattern(regexp = "^[0-9A-Za-z_]{3,25}$", message = "Name contains invalid characters")
    private String name;

    @NotNull
    @Size(min = 6, max = 25, message = "Password must be between 6 and 25 characters")
    @Pattern(regexp = "^[0-9A-Za-z_~!'?@#$%^&*+(){}><.|,:;-]{6,25}$", message = "Incorrect password")
    private String password1;

    @NotNull
    @Size(min = 6, max = 25, message = "Password must be between 6 and 25 characters")
    @Pattern(regexp = "^[0-9A-Za-z_~!'?@#$%^&*+(){}><.|,:;-]{6,25}$", message = "Incorrect password")
    private String password2;

    @NotNull
    @Size(min = 2, max = 64, message = "Email must be between 2 and 64 characters")
    @Pattern(regexp = "[A-Z0-9a-z._-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,64}", message = "Incorrect email")
    private String email;
}