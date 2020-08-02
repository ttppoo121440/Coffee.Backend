import Adapter from '../Adapter';

class CouponList extends Adapter {
  transform() {
    return this.data.map((item) => ({
      ...item,
      deadline_at: item.deadline.datetime,
    }));
  }
}

export default CouponList;
