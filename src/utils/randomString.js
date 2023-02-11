import { customAlphabet } from 'nanoid'

export function generateRandomString() {
    const randomString = customAlphabet('1234567890abcdefghijklmonpqrstuvxzywABCDEFGHIJKLMNOPQRSTUVXZYW', 8)
    return randomString(8);
}