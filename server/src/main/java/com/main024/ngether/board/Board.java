package com.main024.ngether.board;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main024.ngether.likes.Like;
import com.main024.ngether.member.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
public class Board {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long boardId;
    @Column(length = 20, nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private LocalDateTime create_date = LocalDateTime.now();
    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();
    @Column(nullable = false)
    private int likeCount;
    @Column(nullable = false)
    private String category;
    @Column(nullable = false)
    private long price;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


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