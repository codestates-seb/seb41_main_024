package com.main024.ngether.member;

import com.main024.ngether.member.MemberDto.Patch;
import com.main024.ngether.member.MemberDto.Post;
import com.main024.ngether.member.MemberDto.Response;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-05T17:48:22+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostToMember(Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setPw( requestBody.getPw() );
        member.setNickName( requestBody.getNickName() );
        member.setEmail( requestBody.getEmail() );
        member.setPhoneNumber( requestBody.getPhoneNumber() );

        return member;
    }

    @Override
    public Member memberPatchToMember(Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( requestBody.getMemberId() );
        member.setPw( requestBody.getPw() );
        member.setNickName( requestBody.getNickName() );
        member.setEmail( requestBody.getEmail() );

        return member;
    }

    @Override
    public Response memberToMemberResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        Response response = new Response();

        response.setMemberId( member.getMemberId() );
        response.setNickName( member.getNickName() );
        response.setEmail( member.getEmail() );
        response.setPhoneNumber( member.getPhoneNumber() );

        return response;
    }

    @Override
    public List<Response> membersToMemberResponses(List<Member> members) {
        if ( members == null ) {
            return null;
        }

        List<Response> list = new ArrayList<Response>( members.size() );
        for ( Member member : members ) {
            list.add( memberToMemberResponse( member ) );
        }

        return list;
    }
}
