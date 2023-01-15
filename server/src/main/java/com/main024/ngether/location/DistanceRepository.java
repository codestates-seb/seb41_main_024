package com.main024.ngether.location;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DistanceRepository  extends JpaRepository<Distance, Long> {
    Optional<List<Distance>> findByDistanceTypeAndLocationLocationId(Distance.DistanceType distanceType, long locationId);
}
