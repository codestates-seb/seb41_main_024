package com.main024.ngether.member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickName(String nickName);
    Optional<Member> findMemberByPhoneNumber(String phoneNumber);

}