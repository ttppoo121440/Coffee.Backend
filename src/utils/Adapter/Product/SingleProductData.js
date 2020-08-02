import Adapter from '../Adapter';

class SingleProductData extends Adapter {
  transform() {
    return {
      ...this.data,
      imageUrl: this.data.imageUrl.join(),
    };
  }
}

export default SingleProductData;
