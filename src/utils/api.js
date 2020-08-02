import {
  get, post, del, patch,
} from '@/plugins/Axios';

const uuid = process.env.VUE_APP_UUID;

/**
 * 驗證登入
 */

export const checkLogin = (token) => post('api/auth/check', { api_token: token });

export const login = (data) => post('api/auth/login', data);

export const logout = (token) => post('api/auth/logout', { api_token: token });

/**
 * 產品
 */

export const getProduct = (data) => get(`api/${uuid}/admin/ec/products?${data}`);

export const createProduct = (data) => post(`api/${uuid}/admin/ec/product`, data);

export const getSingleProduct = (id) => get(`api/${uuid}/admin/ec/product/${id}`);

export const editProduct = (id, data) => patch(`api/${uuid}/admin/ec/product/${id}`, { ...data });

export const deleteProduct = (id) => del(`api/${uuid}/admin/ec/product/${id}`);

/**
 * 優惠卷
 */

export const getCoupon = (data) => get(`api/${uuid}/admin/ec/coupons?${data}`);

export const getSingleCoupon = (id) => get(`api/${uuid}/admin/ec/coupon/${id}`);

export const editCoupon = (id, data) => patch(`api/${uuid}/admin/ec/coupon/${id}`, { ...data });

export const createCoupon = (data) => post(`api/${uuid}/admin/ec/coupon`, data);

export const deleteCoupon = (id) => del(`api/${uuid}/admin/ec/coupon/${id}`);
/**
 * 訂單
 */

export const getOrder = (data) => get(`api/${uuid}/ec/orders?${data}`);

export const setOrderPaid = (id) => patch(`api/${uuid}/admin/ec/orders/${id}/paid`);

export const setOrderUnpaid = (id) => patch(`api/${uuid}/admin/ec/orders/${id}/unpaid`);

/**
 * 上傳圖片
 */

export const uploadPic = (data) => post(`api/${uuid}/admin/storage`, data, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * 圖片
 */

export const picList = (data) => get(`api/${uuid}/admin/storage?${data}`);

export const deletePic = (id) => del(`api/${uuid}/admin/storage/${id}`);
