import { render, screen } from '@testing-library/react';
import ErrorPassword from '../index';

describe('Renders component', () => {
  test('renders messages', () => {
    render(<ErrorPassword />);
    
    expect(screen.getByText('Senha inválida')).toBeInTheDocument()
    expect(screen.getByText('Senha deve conter 6 digitos')).toBeInTheDocument()
    expect(screen.getByText('Senha deve conter 2 digitos adjacentes iguais')).toBeInTheDocument()
    expect(screen.getByText('Senha deve conter digitos numa sequência crescente ou de mesmo valor')).toBeInTheDocument()
    expect(screen.getByText('Senha deve estar entre os números 184759 e 856920')).toBeInTheDocument()
  });
});