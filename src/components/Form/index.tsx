import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import validatePassword from '../../utils/validatePassword'
import '../../utils/styles/index.css';
import ErrorPassword from '../ErrorPassword';
import SuccessPassword from '../SuccessPassword';

const FormPage: React.FC = () => {
  const schema = yup.object().shape({
    name: yup.string().required('O campo Nome é obrigatório.'),
    email: yup.string().email('Email inválido.').required('O campo Email é obrigatório.'),
    password: yup.string().test('valid-password', '', (value) => {
      if (value && validatePassword(value)) {
        return true
      } else {
        return false
      }
    }),
  });

  const { register, watch, handleSubmit, setError, formState: { errors, isValid, isSubmitted, isSubmitSuccessful } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });
  const watchPassword = watch('password');
  const [showPassword, setShowPassword] = useState(false);
  const disabledButton = watchPassword === '' || !isValid

  const onSubmit = async (data: any) => {
    try {
      const result = await fetch('https://61e036950f3bdb0017934eb0.mockapi.io/api/valid-passwords/results', {
        method: 'POST',
        mode: "cors",
        body: data
      })
      if (result.status !== 201) {
        throw new Error('Falha ao enviar resultado.')
      }
    } catch (error) {
      setError("root.server", {
        type: "server",
        message: 'Erro',
      })
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <h3>Valide sua senha</h3>
      <TextField
        label="Nome"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="E-mail"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Senha"
        type={showPassword ? 'text' : 'password'}
        {...register('password')}
        InputProps={{
          endAdornment:
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(prev => !prev)}
                edge="end"
                className='icon'
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
        }}
      />

      {watchPassword !== '' && (
        errors.password ? <ErrorPassword /> : <SuccessPassword />)}

      <div className={!isSubmitSuccessful ? 'submit' : 'submit-with-no-message'}>
        {isSubmitted &&
          (!isSubmitSuccessful
            ? <p className='error'>Falha ao enviar resultado. Tente novamente.</p>
            : <p className='success'>Resultado enviado com sucesso!</p>)}
        <div>
          <Button className='button' type="submit" variant="contained" disabled={disabledButton}>Enviar</Button>
        </div>
      </div>
    </form>
  );
};

export default FormPage;