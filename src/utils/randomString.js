import { customAlphabet, nanoid } from 'nanoid'

export function generateRandomString() {
    const randomString = customAlphabet('1234567890abcdefghijklmonpqrstuvxzywABCDEFGHIJKLMNOPQRSTUVXZYW', 8)
    return randomString(8);
}

export function reactKey() {
    return nanoid(8);
}