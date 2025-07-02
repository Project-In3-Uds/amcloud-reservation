package cm.amcloud.platform.reservation.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("AMCLOUD Reservation Service API")
                        .version("2.1.0")
                        .description("API documentation for the Reservation microservice.")
                        .contact(new Contact()
                                .name("AMCLOUD Support")
                                .email("project.in3.uds@outlook.com")
                                .url("https://platform.amcloud.cm"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://springdoc.org")));
    }
}
