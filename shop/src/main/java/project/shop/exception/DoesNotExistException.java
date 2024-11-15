package project.shop.exception;

public class DoesNotExistException extends Exception{
    public DoesNotExistException(String message) {
        super(message);
    }
}
