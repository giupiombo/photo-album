import React from 'react';

type PhotoCardProps = {
  image: string;
  caption: string;
  date: string;
};

const PhotoCard: React.FC<PhotoCardProps> = ({ image, caption, date }) => {
  return (
    <div className="relative">
      <img src={image} className="w-full h-auto shadow-lg" />
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 px-4 py-2">
        <p className="text-white text-sm tracking-wider">{caption}</p>
        <p className="text-white text-sm tracking-wider">{date}</p>
      </div>
    </div>
  );
};

export default PhotoCard;
