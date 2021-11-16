/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { black } from '../../theme/colors';

const titleStyle = css`
  text-align: center;
  color: ${black};
  font-size: 3rem;
`;
export default function Title() {
  return (
    <div>
      <p css={titleStyle}>My Recipe Note</p>
    </div>
  );
}
