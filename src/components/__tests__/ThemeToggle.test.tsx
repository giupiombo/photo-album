import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ThemeToggle from '../ThemeToggle';

beforeEach(() => {
  // Always simulate light system preference unless overridden
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query) => ({
      matches: false, // ensure prefers-color-scheme: dark = false
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  );

  localStorage.clear();
  document.documentElement.className = '';
});

describe('ThemeToggle', () => {
  it('initially sets light theme when no stored theme and prefers-color-scheme: dark is false', () => {
    render(<ThemeToggle />);

    // Should NOT have dark mode initially
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    const button = screen.getByRole('button', { name: /toggle dark mode/i });
    expect(button).toBeInTheDocument();
  });

  it('loads dark theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles between light and dark mode when clicked', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /toggle dark mode/i });

    // Starts in light mode
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click → switch to dark
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    // Click again → switch back to light
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
