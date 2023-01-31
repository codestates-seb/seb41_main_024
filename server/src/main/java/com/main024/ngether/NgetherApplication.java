package com.main024.ngether;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

import javax.annotation.PostConstruct;
import java.util.Calendar;
import java.util.TimeZone;

@SpringBootApplication
@EnableAsync
public class NgetherApplication {
	@PostConstruct
	public void started(){
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
		System.out.println("현재 시간 : " + Calendar.getInstance());
	}

	public static void main(String[] args) {
		SpringApplication.run(NgetherApplication.class, args);
	}

}
