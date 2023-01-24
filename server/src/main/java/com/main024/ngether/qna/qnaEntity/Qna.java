package com.main024.ngether.qna.qnaEntity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main024.ngether.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Qna {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long qnaId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private LocalDateTime createDate = LocalDateTime.now();
    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Qna.QnaStatus qnaStatus;


    public enum QnaStatus {
        NO_ANSWER("답변 전"),
        ANSWERED("답변 완료");


        @Getter
        private String status;

       QnaStatus(String status) {
            this.status = status;
        }
    }



    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @JsonIgnore
    @OneToMany(mappedBy = "qna",cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>();
}
