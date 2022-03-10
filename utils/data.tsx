import { Price, User } from '../interfaces/index';
import bcrypt from "bcryptjs";

export const sampleUserData: User[] = [
    { 
        name: 'sofien',
        email: 'sofianesprit@gmail.com',
        password: bcrypt.hashSync('123456789'),
        role: 'Admin'
    },
    { 
        name: 'sofiane2',
        email: 'sofienne.nabli@aleia.io',
        password: bcrypt.hashSync('123456789'),
        role: 'Passenger'
    },
    { 
        name: 'sofiane3',
        email: 'sofiannabli1993@gmail.com',
        password: bcrypt.hashSync('123456789'),
        role: 'Conductor'
    },
    { 
        name: 'Phil',
        email: 'phil@example.com',
        password: bcrypt.hashSync('123456'),
        role: 'Passenger'
    },
    {
        name: 'Yacine',
        email: 'yacine.hanaya@aleia.io',
        password: bcrypt.hashSync('123456789'),
        role: 'Passenger'
    },
    {
        name: 'Aina',
        email: 'aina@aleia.io',
        password: bcrypt.hashSync('123456789'),
        role: 'Passenger'
    }
]

export const priceData: Price = {
    price: 15,
    adress: 'lac 2',
}