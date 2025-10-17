import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PhotoAlbum from '../PhotoAlbum';

// Mock PhotoCard to avoid real image rendering
vi.mock('../PhotoCard', () => ({
  default: ({ caption, date }: any) => (
    <div data-testid="photo-card">
      {caption} - {date}
    </div>
  ),
}));

// Mock photoMeta JSON
const mockPhotos = [
  { filename: 'photo1.JPG', title: 'Photo 1', date: '2025-10-15' },
  { filename: 'photo2.JPG', title: 'Photo 2', date: '2025-10-14' },
];

describe('PhotoAlbum', () => {
  it('renders title, description, and footer', () => {
    render(<PhotoAlbum __mockColumnCount={1} __mockPhotoList={mockPhotos} />);
    expect(screen.getByTestId('album-title')).toBeInTheDocument();
    expect(screen.getByTestId('album-desc')).toBeInTheDocument();
    expect(screen.getByTestId('album-footer')).toBeInTheDocument();
  });

  it('renders correct number of PhotoCards', () => {
    render(<PhotoAlbum __mockColumnCount={1} __mockPhotoList={mockPhotos} />);
    const photoCards = screen.getAllByTestId('photo-card');
    expect(photoCards).toHaveLength(2);
    expect(photoCards[0]).toHaveTextContent('Photo 1 - 2025-10-15');
    expect(photoCards[1]).toHaveTextContent('Photo 2 - 2025-10-14');
  });

  it('renders correct number of columns when forced', () => {
    render(<PhotoAlbum __mockColumnCount={3} __mockPhotoList={mockPhotos} />);
    const columns = screen.getAllByTestId('photo-column');
    expect(columns).toHaveLength(3);
  });
});
