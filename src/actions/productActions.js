import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from '../constants/productConstants'

export const listProducts =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })
      const res = await fetch(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`,
      )
      const data = await res.json()

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })
    const res = await fetch(`/api/products/top`)
    const products = await res.json()

    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: products })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const res = await fetch(`/api/products/${id}`)
    const product = await res.json()
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    dispatch({ type: PRODUCT_DELETE_REQUEST })

    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    await res.json()

    dispatch({ type: PRODUCT_DELETE_SUCCESS })
    dispatch(listProducts())
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProduct = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    dispatch({ type: PRODUCT_CREATE_REQUEST })

    const res = await fetch(`/api/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({}),
    })
    const sampleProduct = await res.json()

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: sampleProduct })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    dispatch({ type: PRODUCT_UPDATE_REQUEST })

    const res = await fetch(`/api/products/${product._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(product),
    })
    const updatedProduct = await res.json()

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: updatedProduct })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState()

      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(review),
      })
      await res.json()

      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS })
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
