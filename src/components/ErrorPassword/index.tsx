import React from 'react';
import '../../utils/styles/index.css';

const ErrorPassword: React.FC = () => {

    return (
<div className='error'>
<p>Senha inválida</p>
<ul>
  <li>Senha deve conter 6 digitos</li>
  <li>Senha deve conter 2 digitos adjacentes iguais</li>
  <li>Senha deve conter digitos numa sequência crescente ou de mesmo valor</li>
  <li>Senha deve estar entre os números 184759 e 856920</li>
</ul>
</div>
    );
}

export default ErrorPassword;