/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ReactNode } from 'react';
import { Title } from '../atoms';
import { Grid } from '@material-ui/core';
import { black } from '../../theme/colors';

const containerStyle = css`
  padding: 0.5rem 1.5rem;
  width: 100%;
`;

const headerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.25rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 300;
  svg {
    font-size: 3rem;
  }

  color: ${black};
`;
const horizontallyCentered = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10rem;
`;

interface Props {
  children: ReactNode;
  headerName: string;
}
export default function AuthTemplate({ children, headerName }: Props) {
  return (
    <Grid container>
      <div css={containerStyle}>
        <Title />
        <div css={horizontallyCentered}>
          <Grid item xs={10} md={6}>
            <header css={headerStyle}>
              <div>{headerName}</div>
            </header>
            {children}
          </Grid>
        </div>
      </div>
    </Grid>
  );
}
