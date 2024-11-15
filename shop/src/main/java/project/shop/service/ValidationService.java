package project.shop.service;

import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class ValidationService {
    public Map<String, Object> handleBindingResultErrors(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, Object> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return Map.of("errors", errors);
        }
        return Collections.emptyMap();
    }

    public Map<String, Object> mapErrorMessage(String errorMessage) {
        return Map.of("errors", Collections.singletonMap("error", errorMessage));
    }
}
