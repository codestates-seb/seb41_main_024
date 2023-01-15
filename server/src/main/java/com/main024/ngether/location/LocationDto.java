package com.main024.ngether.location;

import lombok.*;

import javax.validation.constraints.Positive;

public class LocationDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {
        @Positive
        private long memberId;

        private String address;
        private String latitude;
        private String longitude;
    }

    @Getter
    public static class Patch {
        private Long locationId;
        private String latitude;
        private String longitude;
        private String address;

        public void setLocationId(Long locationId) {
            this.locationId = locationId;
        }
    }

    @NoArgsConstructor
    @Setter
    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long locationId;
        private long memberId;
        private String nickName;
        private String latitude;
        private String longitude;
        private String address;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class DistanceCal{
        private Long locationId;
        private Long boardId;

        public void setLocationId(Long locationId) {
            this.locationId = locationId;
        }
    }

    @NoArgsConstructor
    @Setter
    @Getter
    @AllArgsConstructor
    @Builder
    public static class DistanceResponse{
        private String result;
    }

}
