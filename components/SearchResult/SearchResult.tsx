import React, { useState } from 'react';
import Image from 'next/image';
import Icon from '../Icon';
import { useRouter } from 'next/router';

export default function SearchResult({
  onLiked = () => {},
  id = 1,
  liked = false,
  title = '',
  description = '',
  image = '',
  price = '',
}) {
  const [likedState, setLikedState] = useState(liked);

  const router = useRouter();

  return (
    <div className="flex items-start gap-x-5 max-w-[65vw] relative h-[40vh]">
      <div
        className="w-[35vw] h-[40vh] flex items-center relative cursor-pointer"
        onClick={() => {
          router.push(`/listing/${id}`);
        }}
      >
        <Image
          src="https://source.unsplash.com/random/800x800"
          alt="product"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="w-full relative h-full">
        <div className="flex justify-between items-start">
          <div className="flex flex-col items-start gap-y-2">
            <p className="text-xs text-gray-400 font-light">4.8 Rating</p>
            <h3
              className="font-bold text-xl hover:text-gray-500 cursor-pointer"
              onClick={() => {
                router.push('/listing/' + id);
              }}
            >
              {title}
            </h3>
          </div>
          <button onClick={onLiked}>
            <Icon name="heart" size={18} />
          </button>
        </div>
        <hr className="bg-gray-300 w-[1/2] my-3" />
        <p className="font-light text-sm text-gray-400">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet
          accusantium, dolorum, ullam, repellendus quam sit iure repudiandae
          possimus voluptas temporibus expedita minima iste exercitationem
          dignissimos soluta vel? Ab, dolores totam!
        </p>
        <div className="w-full justify-between flex items-center absolute bottom-0">
          <div className="flex items-center gap-x-2 ">
            <Icon name="verified-tag" />
            <p className="text-xs text-gray-400">Verified User </p>
          </div>
          <p className="text-md">
            <span className="font-bold">${price}</span> / day
          </p>
        </div>
      </div>
    </div>
  );
}
