import Adapter from "./Adapter";

class DemoAdapter extends Adapter {
  transform() {
    console.log(this.data);
    return this.data.map((item) => ({
      pic: item.picture.large,
      name: `${item.name.first} ${item.name.last}`,
      age: item.dob.age,
      gender: item.gender,
    }));
  }
}

export default DemoAdapter;
