package project.shop.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderPlaceDto {
    @NotNull
    @Size(min = 3, max = 40, message = "Address must be between 3 and 40 characters")
    private String address;

    @NotNull
    private String paymentMethod;
}
