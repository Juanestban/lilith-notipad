import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import cs from 'classnames';
import httpClient from '@lilith/libs/httpClient';

import { UserSession, UserSessionValidation } from '@lilith/interfaces';
import { Button, ButtonIcon, Input } from '@lilith/components';
import { useToggle } from '@lilith/hooks/useToggle';
import { useSession } from '@lilith/contexts';
import { LOCAL_STORAGE_TOKEN } from '@lilith/config/constants';

import s from '../styles/LoginPage.module.css';

export default function LoginPage() {
  const [session, setSession] = useState<UserSessionValidation>({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { handleUser } = useSession();
  const { toggle: isLogin, handleToggle } = useToggle(true);
  const { toggle: isHidden, handleToggle: handleHidden } = useToggle(true);
  const titleForm = isLogin ? 'login' : 'register';
  const buttonTitleToggle = isLogin ? 'register' : 'login';

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setSession({ ...session, [name]: value });
  };

  const petition = (): Promise<{ data: Omit<UserSession, 'password'> }> => httpClient.post(isLogin ? '/session' : '/users', session);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const MAX_NUMBER_CHARACTER = 8; // val.length >= MAX_NUMBER_CHARACTER
    const isFullField = Object.entries(session)
      .map(([_, value]) => value)
      .every((val: string) => val !== '');

    if (isFullField) {
      try {
        setLoading(true);

        const { data: user } = await petition();

        setLoading(false);
        handleUser(user);
        window.localStorage.setItem(LOCAL_STORAGE_TOKEN, user.token as string);

        await push('/home');
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
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
          <ButtonIcon type="button" icon={isHidden ? 'FiEyeOff' : 'FiEye'} onClick={handleHidden} />
        </div>
        <div className={cs(s.formControl, s.actionButtons)}>
          <Button variant="secondary" type="submit" className={s.button} isLoading={loading}>
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
