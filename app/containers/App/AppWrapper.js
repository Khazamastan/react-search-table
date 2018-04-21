import styled from 'styled-components';
const AppWrapper = styled.div`
margin: 0 auto;
min-height: 101vh;
padding : 40px 100px;
background :transparent url(${ props => props.bg}) center/cover;
transition : background 0.3s ease-in;
.search{
  border : 1px solid #f5f5f5;
  padding : 10px;
  float : right;
  margin : 0 0 30px 0;
  color : #000;
}
.perPage{
  border : 1px solid #f5f5f5;
  padding : 10px;
  float : left;
  margin : 0 0 30px 0;
}
.rc-pagination {
  margin-top : 20px;
}
`;


export default AppWrapper;