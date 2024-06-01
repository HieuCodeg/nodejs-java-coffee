const axios = require('axios');
const { SERVER_API } = require('../models/App.model');

const RoomService = require('./RoomService');

var listRooms = [];

class SocketService {
    connection(socket) {

        socket.use((packet, next)=>{
            global.instanceAxios = axios.create({
                timeout: 10000,
                withCredentials: true
            });
            next();
        })

        console.log("Connected: " + socket.id);
        // console.log("rooms ========");
        // console.log(socket.adapter.rooms);
    
        socket.emit("server-connection", socket.id);

        socket.on("create-room", roomName => {
            // console.log(roomName);
            socket.join(roomName);
            socket.roomByRooms = roomName;
            RoomService.createRoom(socket, roomName, listRooms);
        });

        // socket.on("connect-all-room", rooms =>{
        //     RoomService.joinAllRooms(socket,rooms, listRooms)
        // })

        // socket.on("client-send-message-to-room",(data)=>{

        //     RoomService.sendMessageToRoom(socket,data);
        // })
        // socket.on("client-send-message-new-room", data =>{
        //     RoomService.sendMessageNewRoom(socket,data,listRooms);
        // })
        socket.on("order-product", (accessToken, orderRequest) => {
            RoomService.orderProduct(socket,accessToken, orderRequest);
        })
       
        socket.on("cooking-all-by-product", (accessToken,productId, size) => {
            RoomService.cookingAllByProduct(socket, accessToken,productId, size);
        })

        socket.on("cooking-one-by-product", (accessToken,productId, size) => {
            RoomService.cookingOneByProduct(socket, accessToken,productId, size);
        })

        socket.on("cooking-all-by-table", (accessToken,orderId, tableId) => {
            RoomService.cookingAllByTable(socket, accessToken,orderId, tableId);
        })
        
        socket.on("cooking-one-by-table", (accessToken,orderItemId, orderId, tableId) => {
            RoomService.cookingOneByTable(socket, accessToken,orderItemId, orderId, tableId);
        }
        )
        socket.on("cooking-all-product-by-table", (accessToken,orderId, productId, size, tableId) => {
            RoomService.cookingAllProductByTable(socket, accessToken,orderId, productId, size, tableId);
        })
        socket.on("waiter-all", (accessToken,orderItemId, orderId, tableId) => {
            RoomService.waiterAll(socket, accessToken, orderItemId, orderId, tableId);
        })
        socket.on("waiter-one", (accessToken,orderItemId, orderId, tableId) => {
            RoomService.waiterOne(socket, accessToken, orderItemId, orderId, tableId);
        })

        socket.on("remove-order", (accessToken, orderId, tableId) => {
            RoomService.RemoveOrder(socket, accessToken, orderId, tableId);
        })

        socket.on("remove-order-item", (accessToken, orderId, tableId) => {
            RoomService.RemoveOrderItem(socket, accessToken, orderId, tableId);
        })
        
    }
}
module.exports = new SocketService();