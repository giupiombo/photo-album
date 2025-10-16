import React, { useEffect, useState } from 'react';
import PhotoCard from './PhotoCard';
import photoMeta from '../data/photos.json';

type PhotoAlbumProps = {
  __mockColumnCount?: number; // Optional column count for testing
  __mockPhotoList?: typeof photoMeta; // Optional photo list for testing
};

const PhotoAlbum: React.FC<PhotoAlbumProps> = ({
  __mockColumnCount,
  __mockPhotoList,
}) => {
  const images = import.meta.glob('../photos/*.{JPG,jpeg}', {
    eager: true,
  }) as Record<string, { default: string }>;

  // Use mockPhotoList if provided, else compute photoList from photoMeta + images
  const photoList = __mockPhotoList
    ? __mockPhotoList.map((meta) => ({ ...meta, url: meta.filename }))
    : photoMeta.map((meta) => {
        const match = Object.entries(images).find(([path]) =>
          path.endsWith(meta.filename)
        );
        return { ...meta, url: match?.[1].default ?? '' };
      });

  const useColumnCount = () => {
    const [columns, setColumns] = useState(1);

    useEffect(() => {
      const updateColumns = () => {
        const width = window.innerWidth;
        if (width >= 1536) setColumns(4);
        else if (width >= 1024) setColumns(3);
        else if (width >= 640) setColumns(2);
        else setColumns(1);
      };
      updateColumns();
      window.addEventListener('resize', updateColumns);
      return () => window.removeEventListener('resize', updateColumns);
    }, []);

    return columns;
  };

  const columnCount = __mockColumnCount ?? useColumnCount();

  return (
    <div className="px-4 sm:px-10 lg:px-20 py-8">
      <h1
        data-testid="album-title"
        className="text-3xl font-bold mb-2 tracking-wider text-center"
      >
        GeoLens
      </h1>
      <p
        data-testid="album-desc"
        className="text-md mb-6 tracking-wider text-center"
      >
        A collection of photos taken by @giupiombo.
      </p>

      <div className="flex flex-wrap -mx-2">
        {Array.from({ length: columnCount }).map((_, colIndex) => (
          <div
            key={colIndex}
            className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 px-2"
            data-testid="photo-column"
          >
            {photoList
              .filter((_, i) => i % columnCount === colIndex)
              .map((photo, index) => (
                <div key={index} className="mb-4" data-testid="photo-wrapper">
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

      <p
        data-testid="album-footer"
        className="text-sm mt-20 mb-6 tracking-wider text-center"
      >
        © Copyright {new Date().getFullYear()}. Made by Giulia Piombo.
      </p>
    </div>
  );
};

export default PhotoAlbum;
