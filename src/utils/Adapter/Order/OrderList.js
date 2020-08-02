import Adapter from '../Adapter';

class OrderList extends Adapter {
  transform() {
    return this.data.map((item) => {
      const productTitle = item.products.map((product) => ({
        title: product.product.title,
        quantity: product.quantity,
      }));
      const productItem = productTitle.map((product) => ({
        產品: product.title,
        數量: product.quantity,
      }));
      const temp = productItem.map((element) => `${element.產品} / ${element.數量}`);
      return {
        ...item,
        time: item.created.datetime,
        product: temp.join('<br/>'),
      };
    });
  }
}

export default OrderList;
