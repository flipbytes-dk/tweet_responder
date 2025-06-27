import { cn } from './utils';

describe('cn', () => {
  it('merges tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4 bg-red-500');
    expect(result).toBe('py-1 px-4 bg-red-500');
  });

  it('handles conditional classes', () => {
    const result = cn('px-2', { 'py-4': true, 'bg-blue-500': false });
    expect(result).toBe('px-2 py-4');
  });
}); 