import {
  get, post, del, patch,
} from '@/plugins/Axios';

const uuid = process.env.VUE_APP_UUID;

/**
 * 驗證登入
 */

const checkLogin = (token) => post('api/auth/check', { api_token: token });

const login = (data) => post('api/auth/login', data);

const logout = (token) => post('api/auth/logout', { api_token: token });

/**
 * 產品
 */

const getProduct = (data) => get(`api/${uuid}/admin/ec/products?${data}`);

const createProduct = (data) => post(`api/${uuid}/admin/ec/product`, data);

const getSingleProduct = (id) => get(`api/${uuid}/admin/ec/product/${id}`);

const editProduct = (id, data) => patch(`api/${uuid}/admin/ec/product/${id}`, { ...data });

const deleteProduct = (id) => del(`api/${uuid}/admin/ec/product/${id}`);

/**
 * 優惠卷
 */

const getCoupon = (data) => get(`api/${uuid}/admin/ec/coupons?${data}`);

const getSingleCoupon = (id) => get(`api/${uuid}/admin/ec/coupon/${id}`);

const editCoupon = (id, data) => patch(`api/${uuid}/admin/ec/coupon/${id}`, { ...data });

const createCoupon = (data) => post(`api/${uuid}/admin/ec/coupon`, data);

const deleteCoupon = (id) => del(`api/${uuid}/admin/ec/coupon/${id}`);
/**
 * 訂單
 */

const getOrder = (data) => get(`api/${uuid}/ec/orders?${data}`);

const setOrderPaid = (id) => patch(`api/${uuid}/admin/ec/orders/${id}/paid`);

const setOrderUnpaid = (id) => patch(`api/${uuid}/admin/ec/orders/${id}/unpaid`);

/**
 * 上傳圖片
 */

const uploadPic = (data) => post(`api/${uuid}/admin/storage`, data, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * 圖片
 */

const picList = (data) => get(`api/${uuid}/admin/storage?${data}`);

const deletePic = (id) => del(`api/${uuid}/admin/storage/${id}`);

export {
  checkLogin,
  login,
  logout,
  getProduct,
  createProduct,
  getSingleProduct,
  editProduct,
  deleteProduct,
  uploadPic,
  picList,
  deletePic,
  getCoupon,
  getSingleCoupon,
  editCoupon,
  createCoupon,
  deleteCoupon,
  getOrder,
  setOrderPaid,
  setOrderUnpaid,
};
