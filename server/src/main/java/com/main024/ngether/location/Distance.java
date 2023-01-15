package com.main024.ngether.location;

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
}
