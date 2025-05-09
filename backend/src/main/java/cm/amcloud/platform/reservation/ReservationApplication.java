package cm.amcloud.platform.reservation;

import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ReservationApplication {

	public static void main(String[] args) {
		// Load .env file
        Dotenv dotenv = Dotenv.configure()
                 .load();

        // Set environment variables
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(ReservationApplication.class, args);
	}

}
