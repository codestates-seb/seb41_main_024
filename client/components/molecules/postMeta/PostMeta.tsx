import ElapsedTime from '../elapsedTime/ElapsedTime';
import { postMetaProps } from './postMeta';
const PostMeta = ({ postData }: postMetaProps) => {
  return (
    <div className="ml-4 mt-6">
      <div className="mb-2.5">
        <strong className="text-xl font-medium">{postData?.title}</strong>
      </div>
      <p className="text-sm text-[#475569] mb-4">
        {postData?.category}•<ElapsedTime createdAt={postData?.create_date} />
      </p>
      <div className=" mb-2.5">
        <strong className="text-lg font-medium">
          {postData?.price.toLocaleString()}원(배송비포함)
        </strong>
      </div>
      <p className="text-sm text-[#475569] mb-4">
        모집기간: ~{postData?.deadLine}
      </p>
      <p className="text-sm text-[#475569] mb-4">
        현재 모집인원: {postData?.curNum}명 / 총 모집인원: {postData?.maxNum}명
      </p>
      <p className="text-sm text-[#475569] mb-4">
        참여시 예상금액:{' '}
        {(postData?.price / (postData?.curNum + 1)).toLocaleString()}원
      </p>
      <p className="truncate text-sm text-[#475569] mb-4">
        판매 제품 링크 : {postData?.productsLink}
      </p>
    </div>
  );
};

export default PostMeta;
