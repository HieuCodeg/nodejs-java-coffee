const axios = require("axios");

const App = require("../models/App.model");

const URL = App.BASE_URL_MESSAGE;

let orderProduct = async (socket, accessToken, orderRequest) => {
  try {
    
    axios.defaults.headers.common.Authorization = accessToken;
    const result = await axios.post(App.ORDER_API_URL, orderRequest);
    let obj = {
      clientId: socket.id,
      data: result.data
    }
    socket.emit('order-product-success', obj);
    // _io.sockets.in(socket.roomByRooms).emit("order-product-success", obj);

    const resByProduct = await axios.get(App.LISTITEMS_API_URL);
    const resByTable = await axios.get(App.LISTTABLESITEMSCOOKING_API_URL);
    
    let ts = new Date();

    let objKIT = {
      clientId: socket.id,
      listOrderItemsCooking: resByProduct.data,
     listTableItemsCooking: resByTable.data,
      "ts": ts
    }

    // socket.emit('get-list-cooking', objKIT);
    _io.sockets.in(socket.roomByRooms).emit("get-list-cooking", objKIT);
  } catch (error) {
    socket.emit('order-product-error', 'Lỗi hệ thống, không gọi được món!');
  }
 
}
let RemoveOrder = async (socket, accessToken, orderId, tableId) => {
  try {
    
    axios.defaults.headers.common.Authorization = accessToken;
    const result = await axios.delete(`${App.REMOVEORDER_API_URL}${orderId}`);
    if (result.status === 202) {
      socket.emit('remove-order-success', result.status);
      const resOrder = await axios.get(`${App.GETORDER_API_URL}${orderId}`);
      
      let ts = new Date();
  
      let objCAS = {
        idTable: tableId,
        listItems: resOrder.data,
        "ts": ts
      }
      _io.sockets.in(socket.roomByRooms).emit("get-order-update", objCAS);
  
    }
  } catch (error) {
    socket.emit('remove-order-error', 'Lỗi hệ thống, không hủy được các món trong bàn!');
  }
 
}
let RemoveOrderItem = async (socket, accessToken, orderId, tableId) => {
  axios.defaults.headers.common.Authorization = accessToken;
  const resOrder = await axios.get(`${App.GETORDER_API_URL}${orderId}`);
      let ts = new Date();
      let objCAS = {
        idTable: tableId,
        listItems: resOrder.data,
        "ts": ts
      }
      _io.sockets.in(socket.roomByRooms).emit("get-order-update", objCAS);
 
}

let cookingAllByProduct = async (socket, accessToken,productId, size) => {
  try {
    
    axios.defaults.headers.common.Authorization = accessToken;
    const result = await axios.post(`${App.COOKINGALLBYPRODUCT_API_URL}productId=${productId}&size=${size}`);
   
    
    socket.emit('cooking-all-by-product-success', result.data.orderItemResponseList);
    let listOrders = [];

    let orderIdChangeList = result.data.orderIdChangeList;
    console.log(orderIdChangeList);
    for (let i = 0; i < orderIdChangeList.length; i+=1) {
      const resOrder = await axios.get(`${App.GETORDER_API_URL}${orderIdChangeList[i]}`);
      listOrders.push(resOrder.data);
    }
 
    let ts = new Date();

    let objCAS = {
      listChangeOrder: listOrders,
      "ts": ts
    }

    _io.sockets.in(socket.roomByRooms).emit("get-order-all-by-product", objCAS);

  } catch (error) {
    socket.emit('cooking-all-by-product-error', 'Lỗi hệ thống, vui lòng thử lại sau!');
  }
}
let cookingOneByProduct = async (socket, accessToken,productId, size) => {
  try {
    
    axios.defaults.headers.common.Authorization = accessToken;
    const result = await axios.post(`${App.COOKINGONEBYPRODUCT_API_URL}productId=${productId}&size=${size}`);
   
    
    socket.emit('cooking-one-by-product-success', result.data.orderItemResponseList);

    let orderIdChangeList = result.data.orderIdChangeList;
    const resOrder = await axios.get(`${App.GETORDER_API_URL}${orderIdChangeList[0]}`);
 
    let ts = new Date();

    let objCAS = {
      ordersChange: resOrder.data,
      "ts": ts
    }

    _io.sockets.in(socket.roomByRooms).emit("get-order-one-by-product", objCAS);

  } catch (error) {
    socket.emit('cooking-one-by-product-error', 'Lỗi hệ thống, vui lòng thử lại sau!');
  }
}

let cookingAllByTable = async (socket, accessToken, orderId, tableId) => {
  try {
    axios.defaults.headers.common.Authorization = accessToken;
    const result = await axios.post(`${App.COOKINGALLBYTABLE_API_URL}orderId=${orderId}`);
    if (result.status === 200) {
      socket.emit('cooking-all-by-table-success', result.data);

      const resOrder = await axios.get(`${App.GETORDER_API_URL}${orderId}`);
      
      let ts = new Date();
  
      let objCAS = {
        idTable: tableId,
        listItems: resOrder.data,
        "ts": ts
      }
  
      _io.sockets.in(socket.roomByRooms).emit("get-order-update", objCAS);
  
    }


  } catch (error) {
    socket.emit('cooking-all-by-table-error', 'Lỗi hệ thống, vui lòng thử lại sau!');
  }
}
let cookingOneByTable = async (socket, accessToken, orderItemId, orderId, tableId) => {
  try {
    axios.defaults.headers.common.Authorization = accessToken;
    const result = await axios.post(`${App.COOKINGONEBYTABLE_API_URL}${orderItemId}`);
    if (result.status === 200) {
      socket.emit('cooking-one-by-table-success', result.data);

      const resOrder = await axios.get(`${App.GETORDER_API_URL}${orderId}`);
      
      let ts = new Date();
  
      let objCAS = {
        idTable: tableId,
        listItems: resOrder.data,
        "ts": ts
      }
  
      _io.sockets.in(socket.roomByRooms).emit("get-order-update", objCAS);
  
    }


  } catch (error) {
    socket.emit('cooking-one-by-table-error', 'Lỗi hệ thống, vui lòng thử lại sau!');
  }
}
let waiterOne = async (socket, accessToken, orderItemId, orderId, tableId) => {
  try {
    axios.defaults.headers.common.Authorization = accessToken;
    const result = await axios.post(`${App.WAITERONE_API_URL}${orderItemId}`);
    if (result.status === 200) {
      socket.emit('waiter-one-success', result.status);

      const resOrder = await axios.get(`${App.GETORDER_API_URL}${orderId}`);
      
      let ts = new Date();
  
      let objCAS = {
        idTable: tableId,
        listItems: resOrder.data,
        "ts": ts
      }
  
      _io.sockets.in(socket.roomByRooms).emit("get-order-update", objCAS);
  
    }


  } catch (error) {
    socket.emit('waiter-one-error', 'Lỗi hệ thống, vui lòng thử lại sau!');
  }
}
let waiterAll = async (socket, accessToken, orderItemId, orderId, tableId) => {
  try {
    axios.defaults.headers.common.Authorization = accessToken;
    const result = await axios.post(`${App.WAITERALL_API_URL}${orderItemId}`);
    if (result.status === 200) {
      socket.emit('waiter-all-success', result.status);

      const resOrder = await axios.get(`${App.GETORDER_API_URL}${orderId}`);
      
      let ts = new Date();
  
      let objCAS = {
        idTable: tableId,
        listItems: resOrder.data,
        "ts": ts
      }
  
      _io.sockets.in(socket.roomByRooms).emit("get-order-update", objCAS);
  
    }


  } catch (error) {
    socket.emit('waiter-all-error', 'Lỗi hệ thống, vui lòng thử lại sau!');
  }
}
let cookingAllProductByTable = async (socket, accessToken,orderId, productId, size, tableId) => {
  try {
    axios.defaults.headers.common.Authorization = accessToken;
    const result = await axios.post(`${App.COOKINGALLPRODUCTBYTABLE_API_URL}orderId=${orderId}&productId=${productId}&size=${size}`);
    if (result.status === 200) {
      socket.emit('cooking-all-product-by-table-success', result.data);

      const resOrder = await axios.get(`${App.GETORDER_API_URL}${orderId}`);
      
      let ts = new Date();
  
      let objCAS = {
        idTable: tableId,
        listItems: resOrder.data,
        "ts": ts
      }
  
      _io.sockets.in(socket.roomByRooms).emit("get-order-update", objCAS);
  
    }


  } catch (error) {
    socket.emit('cooking-all-product-by-table-error', 'Lỗi hệ thống, vui lòng thử lại sau!');
  }
}

let createRoom = (socket, roomName, listRooms) => {
  socket.roomByRooms = roomName;

  if (listRooms.indexOf(roomName) >= 0) {
  } else {
    listRooms.push(roomName);
  }
  // _io.sockets.emit("server-send-rooms", listRooms);
  // socket.emit("server-send-room-socket", roomName);
  // socket.broadcast.emit("server-send-room-socket", roomName);
};



let sendMessageNewRoom = (socket, data, listRooms) => {
  createRoom(socket,data.roomChatId,listRooms);

  const url = `${URL}/users/${data.roomChatId}?recipientId=${data.recipientId}&senderId=${data.userId}`;
  axios
    .post(url, data.sendMsg, {
      headers: { "Content-Type": "application/text" },
    })
    .then((res) => {
      socket.emit("newRoom-message","newRoom");
      // let roomId = res.data.roomChatDTO.id;
      socket.in(data.roomChatId).emit("server-send-message", res.data);
    })
    .catch((error) => {
      socket.in(roomId).emit("server-send-message", "not found");
    });
};

const joinAllRooms = (socket, rooms, listRooms) => {
  rooms.forEach((roomName) => {
    socket.roomByRooms = roomName;
    if (listRooms.indexOf(roomName) >= 0) {
    } else {
      listRooms.push(roomName);
    }
  });
};

let sendMessageToRoom = (socket, data) => {
  if (data.type === "user chat") {
    //call api create message user with user
    const url = `${URL}/users/${data.roomChatId}?recipientId=${data.recipientId}&senderId=${data.userId}`;
   
    axios
      .post(url, data.sendMsg, {
        headers: { "Content-Type": "application/text" },
      })
      .then((res) => {
        console.log(data);
        // let roomId = res.data.roomChatDTO.id;
        socket.to(data.roomChatId).emit("server-send-message", res.data);
      })
      .catch((error) => {
        console.log("url",url);
        socket.to(data.roomChatId).emit("server-send-message", "not found");
      });
  }
  if (data.type === "group chat") {
    const url = `${URL}/group/${data.roomChatId}?userId=${data.userId}`;

    axios
      .post(url, data.sendMsg, {
        headers: { "Content-Type": "application/text" },
      })
      .then((res) => {
        socket.to(data.roomChatId).emit("server-send-message", res.data);
      })
      .catch((error) => {
        socket.to(data.roomChatId).emit("server-send-message", "not found");
      });
  }
};

let RoomService = {
  orderProduct,
  cookingAllByProduct,
  cookingOneByProduct,
  cookingAllByTable,
  createRoom,
  sendMessageToRoom,
  sendMessageNewRoom,
  joinAllRooms,
  cookingOneByTable,
  cookingAllProductByTable,
  waiterAll,
  waiterOne,
  RemoveOrder,
  RemoveOrderItem
};

module.exports = RoomService;
