package project.shop.model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class JwtRequest implements Serializable {
    private static final long serialVersionUID = 5926468583005150707L;

    private String name;
    private String password;
    public JwtRequest() {
    }
    public JwtRequest(String name, String password) {
        this.setName(name);
        this.setPassword(password);
    }
}