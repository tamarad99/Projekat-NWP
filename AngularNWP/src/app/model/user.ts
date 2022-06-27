import { UserRole } from "./user-role";

export class User{
    id:number;
    username:string;
    password:string;
    email:string;
    userRole: UserRole

    constructor(id:number, username:string, password:string, email:string, userRole:UserRole){
        this.id = id;
        this.userRole = userRole;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}