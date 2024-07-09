import validatePassword from '../../../utils/validatePassword';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormPage from '../index';

describe('Password Validation', () => {
  test('should return true for a valid password', () => {
    expect(validatePassword('222222')).toBe(true);
  });

  test('should return false for a password that decreases in value', () => {
    expect(validatePassword('236775')).toBe(false);
  });

  test('should return false for a password without adjacent digits', () => {
    expect(validatePassword('135789')).toBe(false);
  });

  test('should return false for a password with less than 6 digits', () => {
    expect(validatePassword('12345')).toBe(false);
  });

  test('should return false for a password with more than 6 digits', () => {
    expect(validatePassword('1234567')).toBe(false);
  });

  test('should return false for a password below the valid range', () => {
    expect(validatePassword('123456')).toBe(false);
  });

  test('should return false for a password above the valid range', () => {
    expect(validatePassword('987654')).toBe(false);
  });
});

describe('FormPage component', () => {
  test('renders form fields', () => {
    render(<FormPage />);
    
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
  });
  test('validates form submission', () => {
    render(<FormPage />);
    
    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: '222222' } });
    fireEvent.click(screen.getByText('Enviar'));
    waitFor(() => expect(screen.queryByText('Falha ao enviar resultado. Tente novamente.')).toBeInTheDocument());
  });

  test('validates password input', () => {
    render(<FormPage />);
    
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: '222222' } });
    
    expect(screen.queryByText('Senha válida!')).toBeInTheDocument();
  });
});