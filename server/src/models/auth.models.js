import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_USERS_PATH = path.join(__dirname, "../data/user.json")

export const getAllUsers = async () => {
    const users = await fs.promises.readFile(DATA_USERS_PATH , "utf-8");
    return JSON.parse(users)
}

export const registerUser = async (user) => {
    const users = await getAllUsers();
    console.log(users)

    const id = Math.max(...users.map(e => e.id)) + 1;
    users.push({
        id,
        username : user.username,
        password : user.password,
        role : user.role
    })

    const createUser = await fs.promises.writeFile(DATA_USERS_PATH , JSON.stringify(users, null, 2), 'utf-8');
    return user;
}