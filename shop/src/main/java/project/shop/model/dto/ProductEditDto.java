package project.shop.model.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ProductEditDto {
    @NotNull
    private UUID id;

    @Size(min = 3, max = 40, message = "Name must be between 3 and 40 characters")
    @NotNull
    private String name;

    @NotNull
    private String category;

    @Size(min = 3, max = 250, message = "Description must be between 3 and 250 characters")
    @NotNull
    private String description;

    @NotNull
    private String photo;

    @NotNull
    @DecimalMin(value = "0.01", inclusive = true, message = "Price must be greater than or equal to 0.01")
    @DecimalMax(value = "100000.0", inclusive = true, message = "Price must be less than or equal to 100000.0")
    private Float price;
}
