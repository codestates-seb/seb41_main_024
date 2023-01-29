package com.main024.ngether.board;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main024.ngether.likes.Like;
import com.main024.ngether.location.Distance;
import com.main024.ngether.location.Location;
import com.main024.ngether.member.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@Entity
public class Board {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long boardId;
    @Column(length = 200, nullable = false)
    private String title;
    @Column(length = 1000,nullable = false)
    private String content;
    @Column(nullable = false)
    private LocalDateTime createDate = LocalDateTime.now();
    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();
    @Column(nullable = false)
    private int likeCount;
    @Column(nullable = false)
    private String category;
    @Column(nullable = false)
    private long price;
    @Column(nullable = false)
    private int maxNum;
    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private BoardStatus boardStatus;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String latitude;
    @Column(nullable = false)
    private String longitude;
    @Column(nullable = false)
    private LocalDate deadLine;
    @Column(length = 1000,nullable = false)
    private String productsLink;
    @Column(nullable = false)
    private int curNum;
    @Column(length = 2000)
    private String imageLink;
    public enum BoardStatus {
        BOARD_NOT_COMPLETE("모집 중"),
        BOARD_COMPLETE("모집 완료"),

        BOARD_TERM_EXPIRE("모집 기간 만료"),
        BOARD_NOT_DELETE("삭제 불가능"),

        FULL_MEMBER("참여 인원이 가득 참");

        @Getter
        private String status;

        BoardStatus(String status) {
            this.status = status;
        }
    }
    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @JsonIgnore
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Distance> distances = new ArrayList<>();
/*
    @OneToOne(mappedBy = "board", cascade = CascadeType.ALL)
    private Location location;

 */


    @JsonIgnore
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    public void addLike(Like like) {
        likes.add(like);
        if (like.getBoard() != this) {
            like.setBoard(this);
        }
    }

}