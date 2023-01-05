package com.main024.ngether.member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.main024.ngether.board.Board;
import com.main024.ngether.likes.Like;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column()
    private String pw;

    @Column(length = 20, nullable = false, unique = true)
    private String nickName;


    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false, unique = true)
    private String phoneNumber;
    @JsonIgnore
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<Board> boards = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "board",cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();


    public Member(long memberId, String pw, String nickName, String email, String phoneNumber) {
        this.memberId = memberId;
        this.pw = pw;
        this.nickName = nickName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public void addBoard(Board board){
        boards.add(board);
        if (board.getMember() != this) {
            board.setMember(this);
        }
    }

    public void addLike(Like like){
        likes.add(like);
        if (like.getMember() != this) {
            like.setMember(this);
        }
    }


    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
}