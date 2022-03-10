// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { LayoutProps } from 'path/to/interfaces';
import { ReactNode } from 'react';

export type LayoutProps = {
    children?: ReactNode
    title?: string
}

export interface RequestProps {
    title?: string
}

export type User = {
    name: string,
    email: string,
    password: string,
    role: string
}
export interface LoginProps {
    title: string
}

export interface Price {
    price: number;
    adress: string,
}

export interface userProp {
    user: {
        _id: string,
        name: string,
        email: string,
        role: string,
        phoneNumber: number
    }
}

export interface userObjectProp {
    _id: string,
    name: string,
    email: string,
    role: string,
    phoneNumber: number
}

export interface requestProp {
    _id: number,
    date: string,
    time: string,
    road: string,
    from: string,
    to: string,
    priceTag: number,
    status: string,
    user_id: string
}

export interface requestInfoState {
    _id: string,
    acceptebby: string,
    date: string,
    from: string,
    priceTag: number,
    road: string,
    status: string,
    time: string,
    to: string,
    user_id: string
}