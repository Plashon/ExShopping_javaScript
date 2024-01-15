class Payment {
  constructor(amount) {
    this.amount = amount;
  }
  printDetail(){
    console.log("ชำระด้วย....")
  }
}
let payment = new Payment(50);
//console.log(payment);

class Cash extends Payment {
  constructor(amount, cashTendered) {
    super(amount);
    this.cashTendered = cashTendered;
  }
  printDetail(){
    console.log("ชำระด้วยเงินสด จำนวน "+ this.amount+" บาท")
  }
}
let cash = new Cash(20, "cash");
//console.log(cash);

class Check extends Payment {
  constructor(amount, name, bankID) {
    super(amount);
    this.name = name;
    this.bankID = bankID;
  }
  printDetail(){
    console.log("ชำระด้วยบัตร จำนวน "+ this.amount+" บาท")
  }

  authorized() {
    //console.log("authorized Cash");
  }
}
let check = new Check(30, "check", "0001");
//console.log(check);
check.authorized();

class Credit extends Payment {
  constructor(amount, number, type, expDate) {
    super(amount);
    this.number = number;
    this.type = type;
    this.expDate = expDate;
  }
  printDetail(){
    console.log("ชำระด้วยเครดิต จำนวน "+ this.amount+" บาท")
  }
  authorized() {
    //console.log("authorized Credit");
  }
}
let credit = new Credit(10, "01", "credit", "01/11/1111");
//console.log(credit);
credit.authorized();

///////////////////////END PAYMENT////////////////////////////

class Customer {
  orders = [];
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
  addOrder(order) {
    this.orders.push(order);
  }
}
//   let customer = new Customer("customer", "01/01");
//   console.log(customer.name);
//   console.log(customer.address);

class Order {
  payment = null;
  orderDetails = [];
  constructor(date, status) {
    this.date = date;
    this.status = { status };
  }
  calcSubTotal() {
    let subtotal = 0;
    for (let i = 0; i < this.orderDetails.length; i++) {
      subtotal += this.orderDetails[i].calcSubTotal();
    }
    return subtotal;
    // return this.orderDetails.reduce(
    //   (calcSubTotal, orderDetail)=>calcSubTotal+orderDetail.subtotal(),
    //   0
    // );
  }
  calcTex() {
    let tex = 0;
    for (let i = 0; i < this.orderDetails.length; i++) {
      tex += this.orderDetails[i].calcTex();
    }
    return tex;
  }

  calcTotal() {
    return this.calcSubTotal() + this.calcTex();
  }

  calcTotalWeight() {
    let weight = 0;
    for (let i = 0; i < this.orderDetails.length; i++) {
      weight += this.orderDetails[i].calcTotalWeight();
    }
    return weight;
  }

  addPayment(payment) {
    this.payment = payment;
  }
  addOrderDetail(orderDetail) {
    this.orderDetails.push(orderDetail);
  }

  printDetail() {
    for (let i = 0; i < this.orderDetails.length; i++) {
      console.log(
        "ลับดับที่ " +
          (i + 1) +
          "  " +
         this.orderDetails[i].getDetail()
      );
    }
    console.log("รวมทังหมด " + this.calcTotal() + " บาท");
    this.payment.printDetail();
  }
}
let order = new Order("order", "sit");
//console.log(order.name);
//console.log(order.status);
// order.calcSubTotal();
// order.calcTex();
// order.calcTotal();
// order.calcTotalWeight();

class OrderDetail {
  item = null;
  constructor(quantity, texStatus) {
    this.quantity = quantity;
    this.texStatus = texStatus;
  }
  calcSubTotal() {
    return this.item.getPriceForQuantity(this.quantity) + this.calcTex();
  }
  calcTex() {
    return this.item.getTex(this.texStatus);
  }
  calcTotalWeight() {
    return this.item.shippingWeight;
  }

  addItem(item) {
    this.item = item;
  }
  getDetail() {
   return(
          this.item.description +
          " จำนวน " +
          this.quantity +
          " รายการ" +
          " ราคา " +
          this.calcSubTotal() +
          " บาท"
   )
    }

}
let orderDetail = new OrderDetail("order detail", "true");
//console.log(orderDetail.quantity);
//console.log(orderDetail.texStatus);
//orderDetail.calcSubTotal();
// orderDetail.calcTotalWeight();
// orderDetail.calcTex();

class Item {
  inStock = true;
  constructor(shippingWeight, description, price) {
    this.shippingWeight = shippingWeight;
    this.description = description;
    this.price = price;
  }
  setInStock(status) {
    this.inStock = status;
  }
  getPriceForQuantity(quantity) {
    return this.price * quantity;
  }
  getTex(texStatus) {
    if (texStatus === "tex included") {
      return 0;
    }else {
      return this.price * 0.07;
    }
  }
  inStock() {
    return this.inStock;
  }
}

let item = new Item("shippingWeight", "description");
//console.log(item.shippingWeight);
//console.log(item.description);
// item.getPriceForQuantity();
// item.getTex();
// item.inStock();

// const oldMain = () => {
//   let customer1 = new Customer("Pashon Phubate", "25/11");
//   let customer2 = new Customer("ภูเบศวร์ นิ่มนวล", "25/11");

//   //product item
//   let item1 = new Item(0.3, "ออลอินวันบักเก็ต", 299);
//   let item2 = new Item(0.9, "เดอะบอกซ์ป๊อบบอมบ์แซ่บ", 169);
//   let item3 = new Item(0.4, "ชุดข้าวแซ่บ เคเอฟซี", 109);
//   let item4 = new Item(0.2, "ชิคแอนด์แชร์ ทีมนักเก็ตส์ป๊อป", 109);
//   let item5 = new Item(0.5, "พอใจ บักเก็ต", 209);
//   //create order
//   const order1 = new Order("08/01/2024", "In process");
//   const order2 = new Order("31/01/2024", "In process");
//   const order3 = new Order("30/11/2567", "In process");

//   //add order1 to customer
//   customer1.addOrder(order1);
//   //create orderDetill
//   const orderDetail1 = new OrderDetail(5, "tex included");
//   orderDetail1.addItem(item2);
//   const orderDetail2 = new OrderDetail(2, "tex included");
//   orderDetail2.addItem(item1);
//   //add orderDetill to order
//   order1.addOrderDetail(orderDetail1);
//   order1.addOrderDetail(orderDetail2);

//   //add order2
//   customer1.addOrder(order2);
//   const orderDetail3 = new OrderDetail(2, "tex included");
//   orderDetail3.addItem(item4);
//   const orderDetail4 = new OrderDetail(4, "tex included");
//   orderDetail4.addItem(item2);
//   order2.addOrderDetail(orderDetail3);
//   order2.addOrderDetail(orderDetail4);

//   customer2.addOrder(order3);
//   const orderDetail5 = new OrderDetail(1, "tex included");
//   orderDetail5.addItem(item2);
//   const orderDetail6 = new OrderDetail(3, "tex included");
//   orderDetail6.addItem(item1);
//   order3.addOrderDetail(orderDetail5);
//   order3.addOrderDetail(orderDetail6);

//   // console.log(customer1.orders);

//   //ชื่อ
//   //จำนวนคำสั่งซื้อ
//   //คำสั่งซื้อที่
//   //1 เดอะบอกซ์ป๊อบบอมบ์แซ่บ จำนวน 5 รายการ ราคา 000 บาท
//   //2 เดอะบอกซ์ป๊อบบอมบ์แซ่บ จำนวน พอใจ บักเก็ต รายการ ราคา 000 บาท
//   //รวมทังหมด 0000 บาท

//   console.log("ชื่อ : " + customer1.name);
//   console.log("จำนวนคำสั่งซื้อ : " + customer1.orders.length);
//   for (let i = 0; i < customer1.orders.length; i++) {
//     console.log("คำสั่งซื้อที่ : " + (i + 1));
//     let total = 0;
//     // console.log(customer1.orders[i]);
//     for (let k = 0; k < customer1.orders[i].orderDetails.length; k++) {
//       const item = customer1.orders[i].orderDetails[k].item;
//       const quantity = customer1.orders[i].orderDetails[k].quantity;
//       const subtotal = quantity * item.price;
//       total += subtotal;
//       console.log(
//         "ลับดับที่ " +
//           (k + 1) +
//           "  " +
//           item.description +
//           " จำนวน " +
//           quantity +
//           " รายการ" +
//           " ราคา " +
//           subtotal +
//           " บาท"
//       );
//     }
//     console.log("รวมทังหมด " + total + " บาท");
//   }

//   console.log("ชื่อ : " + customer2.name);
//   console.log("จำนวนคำสั่งซื้อ : " + customer2.orders.length);
//   for (let i = 0; i < customer2.orders.length; i++) {
//     console.log("คำสั่งซื้อที่ : " + (i + 1));
//     let total = 0;
//     // console.log(customer1.orders[i]);
//     for (let k = 0; k < customer2.orders[i].orderDetails.length; k++) {
//       const item = customer2.orders[i].orderDetails[k].item;
//       const quantity = customer2.orders[i].orderDetails[k].quantity;
//       const subtotal = quantity * item.price;
//       total += subtotal;
//       console.log(
//         "ลับดับที่ " +
//           (k + 1) +
//           "  " +
//           item.description +
//           " จำนวน " +
//           quantity +
//           " รายการ" +
//           " ราคา " +
//           subtotal +
//           " บาท"
//       );
//     }
//     console.log("รวมทังหมด " + total + " บาท");
//   }
// };

const newMain = () => {
  let customer1 = new Customer("Pashon Phubate", "25/11");
  let customer2 = new Customer("ภูเบศวร์ นิ่มนวล", "25/11");

  //product item
  let item1 = new Item(0.3, "ออลอินวันบักเก็ต", 299);
  let item2 = new Item(0.9, "เดอะบอกซ์ป๊อบบอมบ์แซ่บ", 169);
  let item3 = new Item(0.4, "ชุดข้าวแซ่บ เคเอฟซี", 109);
  let item4 = new Item(0.2, "ชิคแอนด์แชร์ ทีมนักเก็ตส์ป๊อป", 109);
  let item5 = new Item(0.5, "พอใจ บักเก็ต", 209);
  //create order
  const order1 = new Order("08/01/2024", "In process");
  const order2 = new Order("31/01/2024", "In process");
  const order3 = new Order("30/11/2567", "In process");

  //add order1 to customer
  customer1.addOrder(order1);
  //create orderDetill
  const orderDetail1 = new OrderDetail(5, "tex not included");
  orderDetail1.addItem(item2);
  const orderDetail2 = new OrderDetail(2, "tex not included");
  orderDetail2.addItem(item1);
  //add orderDetill to order
  order1.addOrderDetail(orderDetail1);
  order1.addOrderDetail(orderDetail2);

  //add order2
  customer1.addOrder(order2);
  const orderDetail3 = new OrderDetail(2, "tex included");
  orderDetail3.addItem(item4);
  const orderDetail4 = new OrderDetail(4, "tex included");
  orderDetail4.addItem(item2);
  order2.addOrderDetail(orderDetail3);
  order2.addOrderDetail(orderDetail4);

  customer2.addOrder(order3);
  const orderDetail5 = new OrderDetail(1, "tex included");
  orderDetail5.addItem(item2);
  const orderDetail6 = new OrderDetail(3, "tex included");
  orderDetail6.addItem(item1);
  order3.addOrderDetail(orderDetail5);
  order3.addOrderDetail(orderDetail6);
  // แสดงรายละเอียดคำสั่งซื้อสำหรับลูกค้าคนที่ 1

//Payment
const cash = new Cash(order1.calcTotal()," ");
customer1.orders[0].addPayment(cash);
const credit = new Credit(order2.calcTotal(),"123456789","credit","10/02");
customer1.orders[1].addPayment(credit);

  console.log("ชื่อ : " + customer1.name);
  console.log("จำนวนค่าสั่งซื้อ : " + customer1.orders.length);
  for (let i = 0; i < customer1.orders.length; i++) {
    console.log("คำสังซื้อที่ : " + (i + 1));
    customer1.orders[i].printDetail();
  }
};

newMain();
