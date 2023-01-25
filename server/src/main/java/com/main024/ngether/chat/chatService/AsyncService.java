package com.main024.ngether.chat.chatService;

import com.main024.ngether.chat.chatEntity.ChatRoomMembers;
import com.main024.ngether.chat.chatRepository.ChatRoomMembersRepository;
import com.main024.ngether.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AsyncService {

    private final MemberService memberService;
    private final ChatRoomMembersRepository chatRoomMembersRepository;

    public boolean check() throws InterruptedException {

        while (true) {
            boolean check = false;
            List<ChatRoomMembers> chatRoomMembers = chatRoomMembersRepository.findByMemberMemberId(memberService.getLoginMember().getMemberId());
            if(chatRoomMembers == null)
                return false;
            for (int i = 0; i < chatRoomMembers.size(); i++) {
                if (chatRoomMembers.get(i).getUnreadMessageCount() > 0) {
                    check = true;
                    return check;
                }
            }
            Thread.sleep(1000L);
        }
    }

    @Async
    public void getBoolean(final DeferredResult<Boolean> deferredResult) throws InterruptedException {
        deferredResult.setResult(check());
    }
}

