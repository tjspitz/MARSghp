import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Col, Form, OverlayTrigger, Row } from 'react-bootstrap';
import { validators } from '../../lib/validators';
import { EmailTip, LoginBtnTip, PasswordTip } from '../Tooltips';

const goodbye = 'https://bestanimations.com/Earth&Space/supernova-blue-star-animation.gif';

const UpperRightForm = ({
  modalShow,
  setModalShow,
}: {
  modalShow: boolean;
  setModalShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [formIsValidated, setFormIsValidated] = useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showLoginBtnTip, setShowLoginBtnTip] = useState<boolean>(false);
  const [failCount, setFailCount] = useState<number>(0);

  const validated = Object.values(formIsValidated).every(
    (validator) => validator
  );

  const tipDelay = { show: 250, hide: 250 };

  /**
   * @description
   * validates a form input - pass the validator needed as first arg,
   * followed by the form value being validated as second arg
   * @param validatorKey
   * @param formKey
   * @returns nothing, although it sets validation states accordingly
   */
  const handleValidations = (
    validatorKey: keyof typeof validators,
    formKey: keyof typeof form,
    value = form[formKey]
  ): void => {
    setFormIsValidated((s) => {
      return {
        ...s,
        [formKey]: validators[validatorKey](value),
      };
    });
  };

  const handleFormSubmit = () => {
    if (form.email === 'example@mars.com' && form.password === 'potato') {
      alert('Congratulations, you have signed in correctly!');
      setFailCount(0);
    } else if (failCount < 4) {
      alert('Beep boop, invalid login. Self-destruct imminent.');
      setModalShow(!modalShow);
      setFailCount(failCount + 1);
    } else {
      alert('Beep boop, five consecutive failed attempts. Goodbye.');
      window.location.assign(goodbye);
    }
    setForm({
      email: '',
      password: '',
    });
    setFormIsValidated({
      email: false,
      password: false,
    });
  };

  return (
    <>
      <Form>
        <Form.Group
          className="ps-5 mb-5"
          controlId="email"
        >
          <Form.Label>Email</Form.Label>
          <OverlayTrigger
            placement="top"
            delay={tipDelay}
            overlay={EmailTip}
          >
            <Form.Control
              type="email"
              className={`${!formIsValidated.email && 'border border-danger'} bg-white-semi`}
              placeholder="your_email@email.com"
              value={form.email}
              onChange={(e) =>
                setForm((s) => ({ ...s, email: e.target.value }))
              }
              onBlur={() => handleValidations('email', 'email')}
            />
          </OverlayTrigger>
        </Form.Group>
        <Form.Group
          className="ps-5 mb-5"
          controlId="password"
        >
          <Form.Label>Password</Form.Label>
          <OverlayTrigger
            placement="top"
            delay={tipDelay}
            overlay={PasswordTip}
          >
            <div className="position-relative">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                className={`${!formIsValidated.password && 'border border-danger'} bg-white-semi`}
                placeholder="enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm((s) => ({ ...s, password: e.target.value }))
                }
                onBlur={() => handleValidations('password', 'password')}
              />
              <div className="d-flex justify-content-end position-absolute end-0 top-50 translate-middle-y">
                <Button
                  variant="white"
                  style={{ width: 'min-content' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '🪬'}
                </Button>
              </div>
            </div>
          </OverlayTrigger>
          <Row className="mt-2">
            <Col className="d-flex flex-row-reverse">
              <a
                className="link"
                onClick={() => setModalShow(!modalShow)}
              >
                Forgot Password
              </a>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <OverlayTrigger
        placement="bottom"
        delay={tipDelay}
        overlay={LoginBtnTip}
        show={showLoginBtnTip && !validated}
      >
        <div
          className="ps-5 mb-5 w-100 d-flex justify-content-center"
          onMouseEnter={() => setShowLoginBtnTip(!showLoginBtnTip)}
          onMouseLeave={() => setShowLoginBtnTip(!showLoginBtnTip)}
        >
          <Button
            type="button"
            className="w-50"
            disabled={validated ? false : true}
            variant={validated ? 'danger' : 'outline-secondary'}
            onClick={handleFormSubmit}
          >
            Login
          </Button>
        </div>
      </OverlayTrigger>
    </>
  );
};

export default UpperRightForm;
