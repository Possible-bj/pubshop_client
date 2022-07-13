import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from '../constants/productConstants'
import { API_URL } from '../constants/config'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  // console.log(productId)

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [imageSrc, setImageSrc] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_DETAILS_RESET })
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name && !loading && !error) {
        dispatch(listProductDetails(productId))
      } else if (!loading && !error && product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setImage(product.image)
        setBrand(product.brand)
        setPrice(product.price)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, loading, error, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    // console.log(URL.createObjectURL(file))

    const reader = new FileReader()
    reader.onload = (() => {
      return (e) => {
        setImageSrc(e.target.result)
      }
    })()

    reader.readAsDataURL(file)
    formData.append('image', file)

    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(
        `${API_URL}/api/uploads`,
        formData,
        config,
      )
      setImage(data.secure_url)
      setUploading(false)
    } catch (error) {
      setUploading(false)
      console.log(error)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        image,
        brand,
        price,
        category,
        countInStock,
        description,
      }),
    )
  }

  return (
    <>
      <Link to={`/admin/productlist`} className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {errorUpdate && <Message>{errorUpdate}</Message>}
        {loading ? (
          <Loader loaderWidth={'50px'} loaderHeight={'50px'} />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                className='br-6'
                required
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Price'
                className='br-6'
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image'
                value={image}
                required
                className='br-6'
                onChange={(e) => setImage(e.target.value)}></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                className='br-6'
                onChange={uploadFileHandler}></Form.File>
              {uploading ? (
                <Loader
                  animation={'grow'}
                  loaderSize={'sm'}
                  loaderWidth={'20px'}
                  loaderHeight={'20px'}
                />
              ) : null}
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  className='br-6'
                  style={{ width: '100px', height: '100px' }}
                />
              ) : null}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Brand'
                className='br-6'
                value={brand}
                required
                onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='CountInStock'>
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Count in Stock'
                value={countInStock}
                required
                className='br-6'
                onChange={(e) =>
                  setCountInStock(e.target.value)
                }></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                required
                className='br-6'
                onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                type='text'
                row={6}
                placeholder='Enter Description'
                value={description}
                className='br-6'
                required
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              className='br-6'
              disabled={loadingUpdate ? loadingUpdate : false}>
              {loadingUpdate ? (
                <Loader
                  loaderSize={'sm'}
                  loaderWidth={'20px'}
                  loaderHeight={'20px'}
                />
              ) : (
                'Update'
              )}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
