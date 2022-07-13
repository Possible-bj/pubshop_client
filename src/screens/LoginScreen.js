import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordType, setPasswordType] = useState('password')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo && userInfo.name) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const passwordTypeHandler = (checked) => {
    if (checked) {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            required
            className='br-6'
            onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' style={{ position: 'relative' }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={passwordType}
            placeholder='Enter password'
            value={password}
            required
            className='br-6'
            onChange={(e) => setPassword(e.target.value)}></Form.Control>
          <Form.Group
            inline
            controlId='togglepassword'
            style={{
              position: 'absolute',
              top: 0,
              left: 'auto',
              right: 0,
              bottom: 0,
              margin: 'auto',
            }}>
            <Form.Check
              type='switch'
              label={
                passwordType === 'password' ? 'Show Password' : 'Hide Password'
              }
              onChange={(e) =>
                passwordTypeHandler(e.target.checked)
              }></Form.Check>
            {/* <Form.Label>
              {passwordType === 'password' ? 'Show Password' : 'Hide Password'}
            </Form.Label> */}
          </Form.Group>
        </Form.Group>
        <Button
          type='submit'
          variant='primary'
          className='br-6'
          disabled={loading ? loading : false}>
          {loading ? (
            <Loader
              loaderSize={'sm'}
              loaderWidth={'20px'}
              loaderHeight={'20px'}
            />
          ) : (
            'Sign In'
          )}
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
