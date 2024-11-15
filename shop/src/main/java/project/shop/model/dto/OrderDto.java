package project.shop.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import project.shop.model.Product;

@Getter
@Setter
public class OrderDto {
    @NotNull
    private Product product;

    @NotNull
    private String status;

    @NotNull
    private String paymentMethod;

    @NotNull
    private String paymentStatus;

    @NotNull
    private String address;
}
