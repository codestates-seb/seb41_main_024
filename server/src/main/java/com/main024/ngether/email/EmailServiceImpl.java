package com.main024.ngether.email;

import java.util.Random;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@PropertySource("classpath:application.yml")
public class EmailServiceImpl implements EmailService{

    @Autowired
    JavaMailSender emailSender;

    @Value("${AdminMail.id}")
    private String id;


    private MimeMessage createMessage(String to, String ePw)throws Exception{
        System.out.println("보내는 대상 : "+ to);
        System.out.println("인증 번호 : "+ePw);
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to);//보내는 대상
        message.setSubject("Ngether 이메일 인증 코드");//제목

        String msgg = "";
        msgg += "<div style='padding: 40px; text-align: center; background-color: #f5f5f5; border-radius: 10px;'>";
        msgg += "<div style='display: flex; flex-direction: column; align-items: center;'>";
        msgg += "<p style='padding-bottom: 1px; font-size: 1.125rem; line-height: 1.75rem;'>";
        msgg += "<strong style='color: rgb(99, 168, 218);'>N게더</strong>에 참여하여 ";
        msgg += "</p>";
        msgg += "<p style='padding-bottom: 1px; font-size: 1.125rem; line-height: 1.75rem;'>";
        msgg += "동네의 <strong style='color: rgb(99, 168, 218);'>쇼핑 친구</strong>를 만나보세요";
        msgg += "</p>";
        msgg += "</div>";
        msgg += "<p style='font-size: 20px; color: #333; margin-top: 20px;'>해당 코드를 입력해주세요:</p>";
        msgg += "<div style='border: 1px solid #333; padding: 20px; margin:20px auto 0; border-radius: 10px; max-width: 700px;'>";
        msgg += "<div style='font-size: 24px;'>";
        msgg+= "CODE : <strong>";
        msgg+= ePw+"</strong>";
        msgg += "</div>";
        msgg += "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress(id,"Ngether"));//보내는 사람

        return message;
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }
    @Override
    public String sendSimpleMessage(String to)throws Exception {
        // TODO Auto-generated method stub
        String ePw = createKey();
        MimeMessage message = createMessage(to,ePw);
        try{//예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw;
    }
}
