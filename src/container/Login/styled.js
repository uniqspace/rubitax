import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  width: 656px;
  height: 493px;
  background: #FFFFFF;
  box-shadow: 0px 12px 76px rgba(226, 48, 142, 0.1);
  border-radius: 8px;
  padding: 120px 133px 82px 133px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 700px) {
     width: 93.6%;
     height: 350px;
     padding: 40px 24px;
   }

`;