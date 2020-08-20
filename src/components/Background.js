import styled from 'styled-components';

const StyledBackground = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-size: 110%;
  animation: fade-in 3s ease;
  position: relative;
`;

export default StyledBackground;
