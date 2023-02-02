package com.main024.ngether.location;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main024.ngether.board.Board;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Distance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long distanceId;

    @Column(nullable = false)
    private double result;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private DistanceType distanceType;

    public enum DistanceType {

        DISTANCE_500("500m"),
        DISTANCE_1000("1km"),
        DISTANCE_1500("1.5km"),
        DISTANCE_200("200m"),
        DISTANCE_400("400m"),
        DISTANCE_600("600m"),
        DISTANCE_EXCESS_RANGE("거리 초과 범위");



        @Getter
        private String type;

        DistanceType(String type) {
            this.type = type;
        }
    }
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "LOCATION_ID")
    private Location location;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;


}
