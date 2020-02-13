import styled from 'styled-components';

export const Logo = styled.img.attrs({
  src: '/images/oyez.png',
})`
     alt: "image";
     width: 70px;
     float:left;
     padding-bottom:0;
   `;
export const Text = styled.span`
   display: block;
   color: black;
   font-size: 20px;
   float:right;
   font-size:arial;
   font-weight:bold;
   padding-bottom:0;
 `;
export const BlockHeader = styled.div`
   margin-left:40px;
   margin-right:40px;
   align-items: center;
   display:flex;
   justify-content: space-between
   color: #000,
  font-size: 16px,
  border: 2px solid #000, 
  border-radius: 100%, 
  padding: 6px,
   `;
