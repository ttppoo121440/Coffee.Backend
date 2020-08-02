import Adapter from '../Adapter';

class ProductForm extends Adapter {
  transform() {
    return {
      ...this.data,
      imageUrl: [this.data.imageUrl],
    };
  }
}

export default ProductForm;
