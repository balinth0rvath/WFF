export class Account {
    id:number;
    fullName:string;
    email:string;
    introduction:string;
    

    constructor(id, fullName, email, introduction) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.introduction = introduction;    
    }
}