import ElapsedTime from '../elapsedTime/ElapsedTime';
import { productDataProps } from './postMetaType';

const PostMeta = ({ productData }: productDataProps) => {
  return (
    <div className="ml-4 mt-6">
      <div className="mb-2.5">
        <strong className="text-xl font-medium">{productData?.title}</strong>
      </div>
      <p className="text-sm text-[#475569] mb-4">
        {productData?.category}•
        <ElapsedTime createdAt={productData?.createDate} />
      </p>
      <div className=" mb-2.5">
        <strong className="text-lg font-medium">
          {productData?.price.toLocaleString()}원(배송비포함)
        </strong>
      </div>
      <p className="text-sm text-[#475569] mb-4">
        모집기간: ~{productData?.deadLine}
      </p>
      <p className="text-sm text-[#475569] mb-4">
        현재 모집인원: {productData?.curNum}명 / 총 모집인원:
        {productData?.maxNum}명
      </p>
      <p className="text-sm text-[#475569] mb-4">
        참여시 예상금액:
        {(productData?.price / (productData?.curNum + 1)).toLocaleString()}원
      </p>
      <p className="truncate text-sm text-[#475569] mb-4">
        판매 제품 링크 : {productData?.productsLink}
      </p>
    </div>
  );
};

export default PostMeta;
