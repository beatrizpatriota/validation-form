import { render, screen } from '@testing-library/react';
import SuccessPassword from '../index';

describe('Renders component', () => {
  test('renders messages', () => {
    render(<SuccessPassword />);
    
    expect(screen.getByText('Senha válida!')).toBeInTheDocument()
  });
});