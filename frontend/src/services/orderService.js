import axios from "axios";

export const createOrder = async order => {
    try{
        const { data } = axios.post('/api/orders/create', order);
        return data;
    }catch(error) {}
}

export const getNewOrderForCurrentUser = async () => {
    try {
        
        const { data } = await axios.get('/api/orders/newOrderForCurrentUser');

        console.log(data)
        return data;
    } catch (error) {
        
    }
}

export const pay = async paymentId => {
    try{
        const {data} = await axios.put('/api/orders/pay', {paymentId});
        return data;
    }catch(error){}
};