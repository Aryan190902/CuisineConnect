import {connect, set} from 'mongoose';
import { UserModel } from '../Models/user.model.js';
import { FoodModel } from '../Models/food.model.js';
import { sample_users } from '../data.js';
import { sample_foods } from '../data.js';
import bcrypt from 'bcryptjs';

const PASSWORD_HASH_SALT_ROUNDS = 10;

set('strictQuery', true);

export const dbconnect = async() => {
    try{
            connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await seedUsers();
        await seedFoods();
        console.log("connect successful ----");
    }   catch(err) {
        console.log(err);
    }
};

async function seedUsers()
{
    const usersCount = (await UserModel.find()).length;
    if(usersCount > 0)
    {
        console.log('Users seed is already done!');
        return;
    }

    for(let user of sample_users)
    {
        user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
        await UserModel.create(user);
    }

    console.log('User seed is done!');
}

async function seedFoods(){
    const foods = (await FoodModel.find()).length;
    if(foods>0)
    {
        console.log('Foods seed is already done!');
        return;
    }
    for(const food of sample_foods){
        food.imageUrl = `/menu/${food.imageUrl}`;
        await FoodModel.create(food);
    }

    console.log('Food seed is done!');
}