import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(
    (state) => state.productTopRated,
  )

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader
      animation={'grow'}
      loaderSize={'sm'}
      loaderHeight={'50px'}
      loaderWidth={'50px'}
    />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark br-6'>
      {products.map((product) => (
        <Carousel.Item key={product._id} className='br-6'>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              className='d-block'
              fluid
            />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} ({product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
