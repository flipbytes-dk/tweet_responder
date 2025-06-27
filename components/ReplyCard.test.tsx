/// <reference types="@testing-library/jest-dom" />

import { render, screen } from '@testing-library/react';
import ReplyCard from './ReplyCard';

describe('ReplyCard', () => {
  it('renders the generated reply', () => {
    const replyText = 'This is a test reply.';
    render(<ReplyCard reply={replyText} />);

    const replyElement = screen.getByText(replyText);
    expect(replyElement).toBeInTheDocument();

    const titleElement = screen.getByText('Generated Reply');
    expect(titleElement).toBeInTheDocument();
  });
}); 