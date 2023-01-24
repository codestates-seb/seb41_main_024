package com.main024.ngether.likes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main024.ngether.board.Board;
import com.main024.ngether.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "LIKES")
public class    Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @Column(nullable = false)
    private boolean status;
}
