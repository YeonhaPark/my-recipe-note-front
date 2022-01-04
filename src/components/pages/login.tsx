/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import { apiProvider } from '../../api/providers';
import { User } from '../../api/types';
import { AuthTemplate } from '../templates';

const sectionStyle = css`
  margin-top: 0.75rem;
`;
const googleBtnStyle = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  height: 65px;
  > div {
    height: 100%;
    width: 240px;
    background: url('./assets/btn_google_signin_light_normal_web@2x.png')
      no-repeat;
    background-size: contain;
  }
`;

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
    <AuthTemplate headerName="Keep safe your never fail recipes">
      <Divider />
      <section css={sectionStyle}>
        <a
          css={googleBtnStyle}
          href={`${process.env.REACT_APP_SERVER_DEV}/auth/google`}
        >
          <div />
        </a>
      </section>
    </AuthTemplate>
  );
}
