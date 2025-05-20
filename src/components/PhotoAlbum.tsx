import React from 'react';
import PhotoCard from './PhotoCard';
import photoMeta from '../data/photos.json';
import { useEffect, useState } from 'react';

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

  const useColumnCount = () => {
    const [columns, setColumns] = useState(1);

    useEffect(() => {
      const updateColumns = () => {
        const width = window.innerWidth;
        if (width >= 1536) setColumns(4); // 2xl
        else if (width >= 1024) setColumns(3); // lg
        else if (width >= 640) setColumns(2); // sm
        else setColumns(1); // base
      };

      updateColumns();
      window.addEventListener('resize', updateColumns);
      return () => window.removeEventListener('resize', updateColumns);
    }, []);

    return columns;
  };

  const columnCount = useColumnCount();

  return (
    <div className="px-4 sm:px-10 lg:px-20 py-8">
      <h1 className="text-3xl font-bold mb-2 tracking-wider text-center">
        GeoLens
      </h1>
      <p className="text-md mb-6 tracking-wider text-center">
        A collection of photos taken by @giupiombo.
      </p>
      <div className="flex flex-wrap -mx-2">
        {Array.from({ length: columnCount }).map((_, colIndex) => (
          <div
            key={colIndex}
            className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 px-2"
          >
            {photoList
              .filter((_, i) => i % columnCount === colIndex)
              .map((photo, index) => (
                <div key={index} className="mb-4">
                  <PhotoCard
                    image={photo.url}
                    caption={photo.title}
                    date={photo.date}
                  />
                </div>
              ))}
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
