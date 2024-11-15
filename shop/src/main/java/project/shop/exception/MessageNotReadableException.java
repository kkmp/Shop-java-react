package project.shop.exception;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import project.shop.service.ValidationService;

import java.util.Map;

@RestControllerAdvice
public class MessageNotReadableException {
    @Autowired
    private ValidationService validationService;

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
        return new ResponseEntity<>(validationService.mapErrorMessage("Incorrect number format"), HttpStatus.BAD_REQUEST);
    }
}
