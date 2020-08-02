import Adapter from '../Adapter';

class ProductList extends Adapter {
  transform() {
    return this.data.map((item) => ({
      ...item,
      imageUrl: item.imageUrl.join(),
    }));
  }
}

export default ProductList;
