import { customAlphabet } from 'nanoid'

export default function generateRandomString() {
    const nanoid = customAlphabet('1234567890abcdefghijklmonpqrstuvxzywABCDEFGHIJKLMNOPQRSTUVXZYW', 8)
    return nanoid(8);
}
