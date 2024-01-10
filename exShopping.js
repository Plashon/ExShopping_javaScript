class Payment {
  constructor(amount) {
    this.amount = amount;
  }
}

class Cash extends Payment {
  constructor(amount, cashTendered) {
    super(amount);
    this.cashTendered = cashTendered;
  }
}

class Check extends Payment {
  constructor(amount, name, bankID) {
    super(amount);
    this.name = name;
    this.bankID = bankID;
  }
  authorized() {
    console.log("Authorized Check");
  }
}

class Credit extends Payment {
  constructor(amount, number, type, expDate) {
    super(amount);
    this.number = number;
    this.type = type;
    this.expDate = expDate;
  }
  authorized() {
    console.log("Authorized Credit");
  }
}

class Customer {
  constructor(name, address) {
    this.name = name;
    this.address = address;
    this.orders = [];
  }

  addOrder(order) {
    this.orders.push(order);
  }
}

class Order {
  constructor(date, status) {
    this.date = date;
    this.status = status;
    this.orderDetails = [];
    this.payment = null;
  }

  calcSubTotal() {
    return this.orderDetails.reduce(
      (total, orderDetail) => total + orderDetail.calcSubTotal(),
      0
    );
  }

  calcTax() {
    return this.orderDetails.reduce(
      (totalTax, orderDetail) => totalTax + orderDetail.calcTax(),
      0
    );
  }

  calcTotal() {
    return this.calcSubTotal() + this.calcTax();
  }

  calcTotalWeight() {
    return this.orderDetails.reduce(
      (totalWeight, orderDetail) => totalWeight + orderDetail.calcTotalWeight(),
      0
    );
  }

  addPayment(payment) {
    this.payment = payment;
  }

  addOrderDetail(orderDetail) {
    this.orderDetails.push(orderDetail);
  }
}

class OrderDetail {
  constructor(quantity, texStatus) {
    this.quantity = quantity;
    this.texStatus = texStatus;
    this.item = null;
  }

  calcSubTotal() {
    return this.item.getPriceForQuantity(this.quantity) + this.calcTax();
  }

  calcTax() {
    return this.item.getTax(this.texStatus);
  }

  calcTotalWeight() {
    return this.item.shippingWeight * this.quantity;
  }

  addItem(item) {
    this.item = item;
  }
}

class Item {
  constructor(shippingWeight, description, price) {
    this.shippingWeight = shippingWeight;
    this.description = description;
    this.price = price;
  }

  getPriceForQuantity(quantity) {
    return this.price * quantity;
  }

  getTax(texStatus) {
    return texStatus === "tex included" ? 0 : this.price * 0.07;
  }
}

const newMain = () => {
  let customer1 = new Customer("Pashon Phubate", "25/11");
  let customer2 = new Customer("ภูเบศวร์ นิ่มนวล", "25/11");

  let item1 = new Item(0.3, "ออลอินวันบักเก็ต", 299);
  let item2 = new Item(0.9, "เดอะบอกซ์ป๊อบบอมบ์แซ่บ", 169);
  let item4 = new Item(0.2, "ชิคแอนด์แชร์ ทีมนักเก็ตส์ป๊อป", 109);

  const order1 = new Order("08/01/2024", "In process");
  const order2 = new Order("31/01/2024", "In process");

  customer1.addOrder(order1);
  const orderDetail1 = new OrderDetail(5, "tex included");
  orderDetail1.addItem(item2);
  const orderDetail2 = new OrderDetail(2, "tex included");
  orderDetail2.addItem(item1);
  order1.addOrderDetail(orderDetail1);
  order1.addOrderDetail(orderDetail2);

  customer1.addOrder(order2);
  const orderDetail3 = new OrderDetail(2, "tex included");
  orderDetail3.addItem(item4);
  const orderDetail4 = new OrderDetail(4, "tex included");
  orderDetail4.addItem(item2);
  order2.addOrderDetail(orderDetail3);
  order2.addOrderDetail(orderDetail4);

  console.log("ชื่อ : " + customer1.name);
  console.log("จำนวนค่าสั่งซื้อ: " + customer1.orders.length);
  for (let i = 0; i < customer1.orders.length; i++) {
    console.log("คำสั่งซื้อที่: " + (i + 1));

    for (let q = 0; q < customer1.orders[i].orderDetails.length; q++) {
      const item = customer1.orders[i].orderDetails[q].item;
      const quantity = customer1.orders[i].orderDetails[q].quantity;
      const subtotal = customer1.orders[i].orderDetails[q].calcSubTotal();
      console.log(
        "ลำดับที่ : " +
          (q + 1) +
          " " +
          item.description +
          " จำนวน : " +
          quantity +
          " ราคา : " +
          subtotal +
          " บาท "
      );
    }
    console.log("ทั้งหมด: " + customer1.orders[i].calcSubTotal() + " บาท");
  }
};

newMain();
