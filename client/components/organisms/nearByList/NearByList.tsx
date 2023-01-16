import React from 'react';
import SharingListItem from '../../molecules/sharingListItem/SharingListItem';
const dummyData = [
  {
    src: '/sharingList/pepsi.svg',
    alt: '펩시콜라',
    title:
      '펩시콜라 200캔 소분하실 분 모집합니다 이틀 동안만 모집해요~~ 얼른 와주세요',
    isFavorite: true,
    id: 1,
  },
  {
    src: '/sharingList/pepsi.svg',
    alt: '펩시콜라',
    title:
      '펩시콜라 200캔 소분하실 분 모집합니다 이틀 동안만 모집해요~~ 얼른 와주세요',
    isFavorite: true,
    id: 2,
  },
  {
    src: '/sharingList/pepsi.svg',
    alt: '펩시콜라',
    title:
      '펩시콜라 200캔 소분하실 분 모집합니다 이틀 동안만 모집해요~~ 얼른 와주세요',
    isFavorite: true,
    id: 3,
  },
  {
    src: '/sharingList/pepsi.svg',
    alt: '펩시콜라',
    title:
      '펩시콜라 200캔 소분하실 분 모집합니다 이틀 동안만 모집해요~~ 얼른 와주세요',
    isFavorite: true,
    id: 4,
  },
  {
    src: '/sharingList/pepsi.svg',
    alt: '펩시콜라',
    title:
      '펩시콜라 200캔 소분하실 분 모집합니다 이틀 동안만 모집해요~~ 얼른 와주세요',
    isFavorite: true,
    id: 5,
  },
  {
    src: '/sharingList/pepsi.svg',
    alt: '펩시콜라',
    title:
      '펩시콜라 200캔 소분하실 분 모집합니다 이틀 동안만 모집해요~~ 얼른 와주세요',
    isFavorite: true,
    id: 6,
  },
];
const NearByList = () => {
  return (
    <div className="grid grid-cols-2 gap-4 m-5 w-fit">
      {dummyData.map((sharingItem) => (
        <SharingListItem
          src={sharingItem.src}
          alt={sharingItem.alt}
          title={sharingItem.title}
          isFavorite={sharingItem.isFavorite}
          key={sharingItem.id}
        />
      ))}
    </div>
  );
};

export default NearByList;
