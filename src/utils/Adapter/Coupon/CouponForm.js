import Adapter from '../Adapter';

class CouponForm extends Adapter {
  transform() {
    return {
      ...this.data,
      deadline_at: this.data.deadline.datetime,
    };
  }
}

export default CouponForm;
