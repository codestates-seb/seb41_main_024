package com.main024.ngether.location;

import com.main024.ngether.board.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<List<Location>> findByMemberMemberId(long memberId);

    Optional<Location> findByLocationId(long locationId);

}
