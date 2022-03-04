import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardLink = styled(Link)`
  &:hover {
    text-decoration: none;
    background-color: #fafafa !important;
  }

  cursor: pointer;
`;

export default CardLink;
