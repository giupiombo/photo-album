import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PhotoCard from '../PhotoCard';

describe('PhotoCard', () => {
  const mockProps = {
    image: 'https://example.com/photo.jpg',
    caption: 'Beautiful Sunset',
    date: '2025-10-15',
  };

  it('renders the image with the correct src', () => {
    render(<PhotoCard {...mockProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockProps.image);
  });

  it('displays the caption and date', () => {
    render(<PhotoCard {...mockProps} />);
    expect(screen.getByText(mockProps.caption)).toBeInTheDocument();
    expect(screen.getByText(mockProps.date)).toBeInTheDocument();
  });

  it('renders overlay container', () => {
    render(<PhotoCard {...mockProps} />);
    const overlay = screen.getByText(mockProps.caption).parentElement;
    expect(overlay).toHaveClass('absolute');
  });
});
