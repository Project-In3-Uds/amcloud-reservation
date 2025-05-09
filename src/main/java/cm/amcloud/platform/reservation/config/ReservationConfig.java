package cm.amcloud.platform.reservation.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "cm.amcloud.platform.reservation.repository")
@EntityScan(basePackages = "cm.amcloud.platform.reservation.model")
public class ReservationConfig {
}
