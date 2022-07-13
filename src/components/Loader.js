import React from 'react'
import { Spinner } from 'react-bootstrap'
const Loader = ({
  loaderSize,
  loadAs,
  ariaHidden,
  loaderWidth,
  loaderHeight,
  animation,
}) => {
  return (
    <Spinner
      as={loadAs}
      animation={animation}
      role='status'
      size={loaderSize}
      aria-hidden={ariaHidden}
      style={{
        width: loaderWidth,
        height: loaderHeight,
        margin: 'auto',
        display: 'block',
      }}>
      <span className='sr-only'> Loading... </span>
    </Spinner>
  )
}
Loader.defaultProps = {
  loaderWidth: '100px',
  loaderHeight: '100px',
  animation: 'border',
}
export default Loader
