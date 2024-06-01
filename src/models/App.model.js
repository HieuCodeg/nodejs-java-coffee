class App {

    static SERVER_API = "http://localhost:25001";
   
    static BASE_URL_API = this.SERVER_API + "/api";
    static BASE_OI_API = this.BASE_URL_API + "/order-items";

    static BASE_URL_MESSAGE = this.BASE_URL_API + "/messages"
    static ORDER_API_URL= this.BASE_URL_API + "/orders/create-with-order-item"
    
    static GETORDER_API_URL= this.BASE_URL_API + "/order-items/cashier?orderId="
    
    static LISTITEMS_API_URL= this.BASE_OI_API + "/kitchen/get-by-status-cooking"
    static LISTTABLESITEMSCOOKING_API_URL = this.BASE_OI_API + "/kitchen/get-by-status-cooking-group-table"
    
    static COOKINGALLBYPRODUCT_API_URL= this.BASE_OI_API + '/kitchen/change-status-cooking-to-waiter-to-product-all?'
    static COOKINGONEBYPRODUCT_API_URL= this.BASE_OI_API + '/kitchen/change-status-cooking-to-waiter-to-product?'
    
    static COOKINGALLBYTABLE_API_URL= this.BASE_OI_API + '/kitchen/change-status-cooking-to-waiter-to-table-all?'
    static COOKINGONEBYTABLE_API_URL= this.BASE_OI_API + '/kitchen/change-status-cooking-to-waiter-to-table?orderItemId='
    static COOKINGALLPRODUCTBYTABLE_API_URL= this.BASE_OI_API + '/kitchen/change-status-cooking-to-waiter-to-product-of-table?'
    
    static WAITERALL_API_URL= this.BASE_OI_API + '/kitchen/change-status-waiter-to-delivery-to-product-of-table?orderItemId='
    static WAITERONE_API_URL= this.BASE_OI_API + '/kitchen/change-status-waiter-to-delivery-to-table?orderItemId='
    
    static REMOVEORDER_API_URL= this.BASE_URL_API + '/orders/delete/'
    static REMOVEORDERITEM_API_URL= this.BASE_URL_API + '/delete/'
}


module.exports = App;