package com.main024.ngether.response;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public class Pagination<T>{
    private List<T> data;
    private Page<T> pageData;


    public Pagination() {

    }

    public Page<T> MadePagination(List<T> data, int page, int size){
        this.data = data;
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), data.size());
        Page<T> responsePage = new PageImpl<>(data.subList(start, end), pageRequest, data.size());
        this.pageData = responsePage;
        return responsePage;
    }

}
