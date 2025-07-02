package cm.amcloud.platform.reservation.service;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify; 
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension; 

import cm.amcloud.platform.reservation.dto.ReservationDTO;
import cm.amcloud.platform.reservation.model.Reservation;
import cm.amcloud.platform.reservation.repository.ReservationRepository;

/**
 * Unit tests for the ReservationService class.
 * This class uses Mockito to isolate the ReservationService from its
 * ReservationRepository dependency and test its business logic in isolation.
 */
@ExtendWith(MockitoExtension.class) 
class ReservationServiceUnitTest {

    @Mock // Creates a mock instance of ReservationRepository.
          // This mock will simulate the behavior of the real repository (e.g., saving to DB).
    private ReservationRepository reservationRepository;

    @InjectMocks // Injects the mock objects (reservationRepository) into this instance of
                 // ReservationService. This is the class under test.
    private ReservationService reservationService;

    // Reusable test data
    private ReservationDTO testReservationDTO;
    private Reservation testReservation;

    /**
     * Sets up common test data before each test method runs.
     */
    @BeforeEach
    void setUp() {
        // Initialize a ReservationDTO for test input
        testReservationDTO = new ReservationDTO();
        testReservationDTO.setTravelerName("John Doe");
        testReservationDTO.setDestination("Paris");
        testReservationDTO.setAgencyName("TravelCo");

        // Initialize a Reservation object that would typically be returned by the repository after saving
        testReservation = new Reservation();
        testReservation.setId(1L); // Simulate an ID being set by the database
        testReservation.setTravelerName("John Doe");
        testReservation.setDestination("Paris");
        testReservation.setAgencyName("TravelCo");
    }

    /**
     * Tests the 'save' method of ReservationService.
     * Verifies that a ReservationDTO is correctly mapped to a Reservation entity,
     * the repository's save method is called, and the saved entity is returned.
     */
    @Test
    void givenReservationDTO_whenSave_thenReturnsSavedReservation() {
        // GIVEN:
        // Configure the mock repository to return our 'testReservation' when its save method is called
        // with any Reservation object.
        when(reservationRepository.save(any(Reservation.class))).thenReturn(testReservation);

        // WHEN:
        // Call the save method on the service with the test DTO.
        Reservation savedReservation = reservationService.save(testReservationDTO);

        // THEN:
        // 1. Assert that the returned reservation is not null.
        assertNotNull(savedReservation);
        // 2. Assert that the ID is set (simulating DB behavior).
        assertEquals(1L, savedReservation.getId());
        // 3. Assert that the properties match the input DTO.
        assertEquals(testReservationDTO.getTravelerName(), savedReservation.getTravelerName());
        assertEquals(testReservationDTO.getDestination(), savedReservation.getDestination());
        assertEquals(testReservationDTO.getAgencyName(), savedReservation.getAgencyName());

        // Verify that the reservationRepository's save method was called exactly once
        // with an instance of Reservation.
        verify(reservationRepository, times(1)).save(any(Reservation.class));
    }

    /**
     * Tests the 'getAll' method of ReservationService.
     * Verifies that the repository's findAll method is called and
     * a list of all reservations is returned.
     */
    @Test
    void whenGetAll_thenReturnsListOfReservations() {
        // GIVEN:
        // Create a list of reservations to be returned by the mock repository.
        // Refactored to use no-arg constructor and setters for better compatibility
        // if @AllArgsConstructor is not present in the model.
        Reservation reservation1 = new Reservation();
        reservation1.setId(2L);
        reservation1.setTravelerName("Jane Doe");
        reservation1.setDestination("London");
        reservation1.setAgencyName("CityTravel");

        Reservation reservation2 = new Reservation();
        reservation2.setId(3L);
        reservation2.setTravelerName("Peter Pan");
        reservation2.setDestination("Neverland");
        reservation2.setAgencyName("FantasyTrips");

        List<Reservation> mockReservations = Arrays.asList(reservation1, reservation2);

        // Configure the mock repository to return our list when its findAll method is called.
        when(reservationRepository.findAll()).thenReturn(mockReservations);

        // WHEN:
        // Call the getAll method on the service.
        List<Reservation> allReservations = reservationService.getAll();

        // THEN:
        // 1. Assert that the returned list is not null and matches the size of our mock list.
        assertNotNull(allReservations);
        assertEquals(2, allReservations.size());
        // 2. Assert that the returned list contains the expected reservations.
        assertEquals(mockReservations, allReservations);

        // Verify that the reservationRepository's findAll method was called exactly once.
        verify(reservationRepository, times(1)).findAll();
    }

}
