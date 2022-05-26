import {User} from '../entities/User';
import {sign} from 'jsonwebtoken';
import {
    ACCESS_TOKEN,
    REFRESH_TOKEN
} from '../config'


export class Auth { 
    //field 
    accessTokenSecrete:string; 
    refreshTokenSecrete:string; 
    userId:string; 
  
    //constructor 
    constructor() { 
       this.accessTokenSecrete  = ACCESS_TOKEN!;
       this.refreshTokenSecrete = REFRESH_TOKEN!;
       this.userId = ''
    }  
 
    //createAccessToken 
    createAccessToken(user:User) {
        this.userId = user.userId
        return sign({userId: this.userId}, this.accessTokenSecrete, {expiresIn: '30m'});
    }

    //createRefreshToken 
    createRefreshToken(user: User) {
        this.userId = user.userId
        return sign({userId: this.userId}, this.refreshTokenSecrete, {expiresIn: '7d'});
    }
    
}