import { Fragment } from 'react';
import Button from '../components/atoms/button/Button';
import Footer from '../components/molecules/footer/Footer';
import SharingListItem from '../components/molecules/sharingListItem/SharingListItem';

export default function Home() {
  return (
    <Fragment>
      <SharingListItem
        title="펩시 100캔 소분하실분 구합니다 2일동안만 모집해요 집 앞에서 만나실 분"
        src="/sharingList/pepsi.svg"
        alt="콜라"
        isHeart={true}
      ></SharingListItem>
      <h1 className="text-3xl font-bold underline">Hello world</h1>
    </Fragment>
  );
}
