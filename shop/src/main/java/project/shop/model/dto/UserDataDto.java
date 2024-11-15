package project.shop.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserDataDto {
    @NotNull
    private UUID id;
    @NotNull
    private String name;
    @NotNull
    private String email;
}
