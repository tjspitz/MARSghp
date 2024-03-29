import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../styles/LoginDemo.css';
import SelfDestruct from './sub_LoginDemo/SelfDestruct';
import UpperLeftPics from './sub_LoginDemo/UpperLeftPics';
import UpperLeftQuotes from './sub_LoginDemo/UpperLeftQuotes';
import UpperRightFooter from './sub_LoginDemo/UpperRightFooter';
import UpperRightForm from './sub_LoginDemo/UpperRightForm';
import UpperRightLogos from './sub_LoginDemo/UpperRightLogos';

const LoginDemo = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);

  return (
    <Container>
      {/* uppper section */}
      <Row className="login-upper">
        {/* uppper left quadrant */}
        <Col
          className="login-upper-left"
          xs={12}
          md={7}
        >
          <Row className="p-4">
            <UpperLeftPics />
          </Row>
          <Row className="p-4">
            <UpperLeftQuotes />
          </Row>
        </Col>
        {/* uppper right quadrant */}
        <Col
          className="login-upper-right"
          xs={12}
          md={5}
        >
          <UpperRightLogos />
          <div className=" mb-5 fake-border"></div>
          <UpperRightForm
            modalShow={modalShow}
            setModalShow={setModalShow}
          />
          <UpperRightFooter />
        </Col>
      </Row>
      {/* lower section (image banner) */}
      <Row
        className="login-lower"
        fluid
      />
      <SelfDestruct
        modalShow={modalShow}
        setModalShow={setModalShow}
      />
    </Container>
  );
};

export default LoginDemo;
