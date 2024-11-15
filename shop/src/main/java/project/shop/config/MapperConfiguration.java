package project.shop.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import project.shop.model.User;
import project.shop.model.dto.UserDto;

@Configuration
public class MapperConfiguration {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

         modelMapper.createTypeMap(UserDto.class, User.class)
                 .addMapping(UserDto::getPassword1, User::setPassword);

        return modelMapper;
    }
}
