package com.main024.ngether.location;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DistanceRepository  extends JpaRepository<Distance, Long> {
    Optional<List<Distance>> findByDistanceTypeAndLocationLocationIdAndBoardCategory
            (Distance.DistanceType distanceType, long locationId, String category, Sort sort);
}
