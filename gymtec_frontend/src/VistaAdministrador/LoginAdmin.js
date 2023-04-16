import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';

function LoginAdmin() {
  return (
    <MDBContainer className="my-5 gradient-form">

      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">Gym TEC</h4>
            </div>

            <MDBInput wrapperClass='mb-4' label='Cédula' id='form1' type='id'/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2">Iniciar sesión</MDBBtn>
            </div>
          </div>

        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginAdmin;