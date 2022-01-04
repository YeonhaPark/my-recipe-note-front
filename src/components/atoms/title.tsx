/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { black } from '../../theme/colors';

const titleStyle = css`
  color: ${black};
  font-size: 1.5rem;
`;
export default function Title() {
  return (
    <div>
      <p css={titleStyle}>my recipe note</p>
    </div>
  );
}
