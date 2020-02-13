import styled from 'styled-components';

const withStyle = (Component) => styled(Component)`
.my-group-segment {
    width: 85%;
    margin-left: 0.7% !important;
  }
.my-segement {
   left: 500px;
   width: 100%;
}
.my-tag {
  left: 102% !important;
  top: -1%;
  position : absolute !important;
}
`;

export default withStyle;
