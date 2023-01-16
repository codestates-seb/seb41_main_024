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
    private String result;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private DistanceType distanceType;

    public enum DistanceType {

        DISTANCE_ONE("1km"),
        DISTANCE_TWO("2km"),
        DISTANCE_THREE("3km");


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
