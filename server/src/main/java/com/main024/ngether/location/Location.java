package com.main024.ngether.location;

import com.main024.ngether.board.Board;
import com.main024.ngether.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;

    @Column(nullable = false)
    private String latitude;

    @Column(nullable = false)
    private String longitude;

    @Column(nullable = false)
    private String address;

    /*
    @OneToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

     */

    /*
    public void setBoard(Board board) {
        this.board = board;
        if (board.getLocation() != this) {
            board.setLocation(this);
        }
    }

     */

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<Distance> distances = new ArrayList<>();
}
