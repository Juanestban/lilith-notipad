import { useState, ChangeEvent } from 'react';
import cs from 'classnames';

import { UserSessionValidation } from '@lilith/interfaces';
import { Button, ButtonIcon, Input } from '@lilith/components';

import s from '../styles/LoginPage.module.css';
import { useToggle } from '@lilith/hooks/useToggle';

export default function LoginPage() {
  const [session, setSession] = useState<UserSessionValidation>({ username: '', password: '' });
  const { toggle: isLogin, handleToggle } = useToggle(true);
  const { toggle: isHidden, handleToggle: handleHidden } = useToggle(true);
  const titleForm = isLogin ? 'login' : 'register';
  const buttonTitleToggle = isLogin ? 'register' : 'login';

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setSession({ ...session, [name]: value });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit', session);
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.formControl}>
          <p className={s.titleLogin}>{titleForm}</p>
        </div>
        <div className={s.formControl}>
          <Input className={s.input} type="text" placeholder="username" name="username" onChange={handleChange} />
        </div>
        <div className={cs(s.formControl, s.containerPassword)}>
          <Input className={s.input} type={isHidden ? 'password' : 'text'} placeholder="password" name="password" onChange={handleChange} />
          <ButtonIcon icon={isHidden ? 'FiEyeOff' : 'FiEye'} onClick={handleHidden} />
        </div>
        <div className={cs(s.formControl, s.actionButtons)}>
          <Button variant="secondary" type="submit" className={s.button}>
            send
          </Button>
          <Button variant="tertiary" type="button" className={s.button} onClick={handleToggle}>
            {buttonTitleToggle}
          </Button>
        </div>
      </form>
    </div>
  );
}
