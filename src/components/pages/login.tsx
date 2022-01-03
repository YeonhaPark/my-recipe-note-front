import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import { apiProvider } from '../../api/providers';
import { User } from '../../api/types';
import { Button } from '../atoms';
import { AuthTemplate } from '../templates';

export default function Login() {
  const history = useHistory();

  const getUser = async () => {
    const res: User = await apiProvider.getCurrentUser();
    if (res && res.id) history.push('/main');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthTemplate headerName="Login">
      <Divider />
      <section>
        <Button type="button">
          <a href={`${process.env.REACT_APP_SERVER_DEV}/auth/google`}>Login</a>
        </Button>
      </section>
    </AuthTemplate>
  );
}
