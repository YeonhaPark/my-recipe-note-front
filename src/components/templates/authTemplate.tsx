/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ReactNode } from 'react';
import { Title } from '../atoms';
import { Container, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { black } from '../../theme/colors';

const ContainerStyled = withStyles({
  root: {
    padding: '0 1.5rem',
    display: 'flex',
  },
})(Container);

const headerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
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
  margin-top: 4rem;
`;

interface Props {
  children: ReactNode;
  headerName: string;
}
export default function AuthTemplate({ children, headerName }: Props) {
  return (
    <ContainerStyled>
      <div css={horizontallyCentered}>
        <Grid item xs={10} md={6}>
          <Title />
          <header css={headerStyle}>
            <div>{headerName}</div>
          </header>
          {children}
        </Grid>
      </div>
    </ContainerStyled>
  );
}
