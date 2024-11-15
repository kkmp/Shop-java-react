package project.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import project.shop.exception.DoesNotExistException;
import project.shop.exception.PasswordsNotTheSameException;
import project.shop.exception.PermissionException;
import project.shop.exception.UserAlreadyExists;
import project.shop.service.ValidationService;

public class BaseController {
    @Autowired
    protected ValidationService validationService;

    @ExceptionHandler({
            PermissionException.class,
            DoesNotExistException.class,
            UserAlreadyExists.class,
            PasswordsNotTheSameException.class,
            DisabledException.class,
            BadCredentialsException.class
    })
    public ResponseEntity<?> handleException(Exception e) throws Exception {
        if(e instanceof PermissionException ||
                e instanceof DoesNotExistException ||
                e instanceof UserAlreadyExists ||
                e instanceof PasswordsNotTheSameException
        ) {
            return new ResponseEntity<>(validationService.mapErrorMessage(e.getMessage()), HttpStatus.NOT_FOUND);
        } else if (e instanceof DisabledException) {
            return new ResponseEntity<>(validationService.mapErrorMessage("Account disabled"), HttpStatus.FORBIDDEN);
        } else if(e instanceof BadCredentialsException) {
            return new ResponseEntity<>(validationService.mapErrorMessage("Credentials not valid"), HttpStatus.FORBIDDEN);
        }
        throw e;
    }
}
