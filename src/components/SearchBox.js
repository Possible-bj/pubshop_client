import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline className='product-search-form'>
      <Form.Control
        type='text'
        name='q'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.trim())}
        placeholder='Search Product'
        className='mr-sm-2 ml-sm-5 br-6'></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2 br-6'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
