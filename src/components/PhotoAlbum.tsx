import React from 'react';
import PhotoCard from './PhotoCard';
import photoMeta from '../data/photos.json';

const PhotoAlbum: React.FC = () => {
  const images = import.meta.glob('../photos/*.{JPG,jpeg}', {
    eager: true,
  }) as Record<string, { default: string }>;

  const photoList = photoMeta.map((meta) => {
    // Find the image URL matching the filename
    const match = Object.entries(images).find(([path]) =>
      path.endsWith(meta.filename)
    );
    return {
      ...meta,
      url: match?.[1].default ?? '',
    };
  });

  return (
    <div className="px-20 py-8">
      <h1 className="text-3xl font-bold mb-2 tracking-wider text-center">
        GeoLens
      </h1>
      <p className="text-md mb-6 tracking-wider text-center">
        A collection of photos taken by @giupiombo.
      </p>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {photoList.map((photo, index) => (
          <div key={index} className="mb-4 break-inside-avoid">
            <PhotoCard
              image={photo.url}
              caption={photo.title}
              date={photo.date}
            />
          </div>
        ))}
      </div>
      <p className="text-sm mt-20 mb-6 tracking-wider text-center">
        © Copyright {new Date().getFullYear()}. Made by Giulia Piombo.
      </p>
    </div>
  );
};

export default PhotoAlbum;
