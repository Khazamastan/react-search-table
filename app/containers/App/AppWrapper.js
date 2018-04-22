import styled from 'styled-components';
const AppWrapper = styled.div`
  margin: 0 auto;
  min-height: 101vh;
  padding : 0 100px 40px 100px;
  background :transparent url(${ props => props.bg}) center/cover;
  transition : background 0.3s ease-in;
  .rc-pagination {
    margin-top : 20px;
  }
`;


export default AppWrapper;