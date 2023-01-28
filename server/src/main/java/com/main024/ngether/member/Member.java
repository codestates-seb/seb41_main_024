package com.main024.ngether.member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.main024.ngether.board.Board;
import com.main024.ngether.chat.chatEntity.ChatRoomMembers;
import com.main024.ngether.likes.Like;
import com.main024.ngether.location.Location;
import lombok.*;
import com.main024.ngether.qna.qnaEntity.Answer;
import com.main024.ngether.qna.qnaEntity.Qna;

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
    @Column(unique = true)
    private String phoneNumber;
    private String imageLink;
    @JsonIgnore
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<Board> boards = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();


    @JsonIgnore
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<ChatRoomMembers> chatRoomMembers = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Location> locations = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<Qna> questions = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>();

    public void addQna(Qna qna) {
        questions.add(qna);
        if(qna.getMember() != this) {
            qna.setMember(this);
        }
    }

    public void addAnswer(Answer answer) {
        answers.add(answer);
        if(answer.getMember() != this) {
            answer.setMember(this);
        }
    }



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


    public Member update(String email, String name){
        this.email = email;
        this.nickName = name;

        return this;
    }

}