import bcrypt from 'bcrypt';

export const encryptPassword = async (password:string) =>{
    return await bcrypt.hash(password, 10);
}

export const bcryptComparePassword = async (password:string, hash:string) => {
    return await bcrypt.compare(password, hash);
}