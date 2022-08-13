// Token xử lí sau
//chưa làm log out
const {PrismaClient} =require('@prisma/client');
const { json } = require('express');
const prisma= new PrismaClient();
const {DataChecker, Message}= require('./DataChecker')
const checker=new DataChecker()
class Access {
    constructor(username,password) {
        this.user_id = 0
        this.username=username
        this.password=password
        this.token=""
    }

    createToken(){

    }
    async logIn(){
        const account= await prisma.uSER_ACCOUNT.findFirst({
            where:{
                US_ACCOUNT: this.username,
                US_PASSWORD: this.password,
            }
        })
        if(!account){
            return new Message(false,"Username or Password is not correct")
        }
        this.user_id=account.US_ID
        return new Message(true,"Log in success")
    }
    async findNewID(){
        const oldAccount=await prisma.uSER_ACCOUNT.aggregate({
            _min:{
                US_ID: true,
            },
            where:{
                 US_ACCOUNT: "",
                },
            })    
        if(oldAccount._min&&oldAccount._min.US_ID>0){
                this.user_id=oldAccount._min.US_ID
                await prisma.uSER_ACCOUNT.delete({
                    where:{
                        US_ID: this.user_id,
                    },
                })
        }
        else{
            const newID= await prisma.uSER_ACCOUNT.aggregate({
                _max:{
                    US_ID: true
                }
            })
            
            this.user_id=newID._max.US_ID+1
           
        }
    }
    async signUp(){
        
        
        if (!checker.username(this.username))
            return new Message(false,"Username is not valid")
        if (!checker.password(this.password))
            return new Message(false,"Password is not valid")
        const existed= await prisma.uSER_ACCOUNT.findFirst({
            where:{
                US_ACCOUNT: this.username
            }
        })
        if(existed)
            return new Message(false,"Username is existed") 
        await this.findNewID()
        await prisma.uSER_ACCOUNT.create({
            data:{
                US_ID:this.user_id,
                US_ACCOUNT:this.username,
                US_PASSWORD: this.password,
                USER_INFO:{
                    create:{}
                

            },
            },
            
        })
        //await prisma.uSER_INFO.create({
        //    data:{
        //        US_ID: this.user_id
        //    }
        //})
        return new Message(true,"Sign up succeed")
        
    }
    async changePass(oldPass,newPass){
        if(this.user_id==0)
            return new Message(false,"User haven't logged in")
        const acc= await prisma.uSER_ACCOUNT.findFirst({
            where:{
                US_ID: this.user_id
            }
        })
        if(!acc)
            return new Message(false,"User didn't exist")
        if(acc.US_PASSWORD!=oldPass)
            return new Message(false,"User input wrong old password")
        if(!checker.password(newPass))
            return new Message (false,"New password has invalid character")
        this.password=newPass
        await prisma.uSER_ACCOUNT.update({
            data:{
                US_PASSWORD: this.password
            },
            where:{
                US_ID: this.user_id
            }
        })
        return new Message(true,"Password is changed")

    }
}

class User_info {
    constructor() {
        this.id = 0
        this.name = ""
        this.mail = ""
        this.phone = ""
        this.birth = ""
        this.gender = ""
        this.address = "" 
    }

    async setID(id){
        
        
        const find= await (async function (id){
            const data= await prisma.uSER_INFO.findUnique({
                where:{
                    US_ID:id,
                },
            })
            return data
        })(id)

        return await(function (find,ob){
        if (!find)
            return new Message(false,"User is not exist")

        ob.id=find.US_ID
        ob.birth=find.US_BIRTH
        ob.gender=find.US_GENDER
        ob.mail=find.US_MAIL
        ob.name=find.US_NAME
        ob.phone=find.US_PHONE
        ob.address=find.US_ADDRESS
            return new Message(true,"Success")
        }(find,this))

    }
    setName(name){
        if(checker.name(name))
        {
           this.name=name
           return new Message(true,"Success")      
        }
        else
        return new Message(false,name+" Is not valid")
    }
    setMail(mail){
        if(checker.email(mail))
        {
           this.mail=mail
           return new Message(true,"Success")     
        }
        else
        return new Message(false,mail+" Is not valid")
    }
    setPhone(phone){
        if(checker.phone(phone))
        {
           this.phone=phone
           return new Message(true,"Success")     
        }
        else
        return new Message(false,phone+" Is not valid")
    }
    setBirth(birth){
        if(checker.day(birth))
        {
           this.birth=birth
           return new Message(true,"Success")     
        }
        else
        return new Message(false,birth+" Is not valid")
    }
    setGender(gender){
        if(gender=="1" || gender=="0")
        {
            this.gender=gender
            return new Message(true,"Success")     
        }
        else
        return new Message(false,gender+" Is not valid")
    }
    setAddress(address){
        if(checker.address(address)){
            this.address=address
            return new Message(true,"Success")  
        }
        else
        return new Message(false,address +" Is not valid")
    }
    async updateDatabase(){
        const data=await prisma.uSER_INFO.update({
            where:{
                US_ID: this.id
            },
            data:{
                US_BIRTH: new Date(this.birth),
                US_GENDER: this.gender,
                US_MAIL: this.mail,
                US_NAME: this.name,
                US_PHONE: this.phone,
                US_ADDRESS: this.address,
            
            }
        })

    }
}

class UserManager{
    constructor(username,password){
        this.acc=new Access(username,password)
        this.info= new User_info()
    }
    async loadInfo(){
        if(this.acc.user_id!=0)
         await this.info.setID(this.acc.user_id)
    }
    async getInfo(){
        if(this.acc.user_id!=0)
            return await prisma.uSER_INFO.findFirst({
                where:{
                    US_ID:this.acc.user_id
                }
            })
    }
    async getListUser(){
        return await prisma.uSER_INFO.findMany({})
    }
}
const temp=new User_info()

//console.log(temp.setName("Pham Minh Tai",true))
async function test(){
    
    console.log(await prisma.pROJECT_INFO.findMany({
        where:{
            PJ_ID:5,

            
        },
        include:{
            ADMIN: {
                include:{
                USER_INFO: true
                
                }
            },
            
            _count:true ,
            PROJECT_MEMBERS:true,
     
        }
    })
    )
    console.log(await prisma.pROJECT_MEMBER.findMany({
        where:{
            PJ_ID:5
        },
        include:{
            //USER_INFO:true,
            //PROJECT_INFO:true,
            PROJECTS:{
            
            }
        }
    }))
    //console.log(JSON.stringify(await prisma.uSER_INFO.findMany({
    //    where:{
    //        US_ID:1
    //    },
    //    include:{
    //        USER_ACCOUNT:true,
    //        PROJECT_MEMBER:true
    //    }
    //})))
    const account=new UserManager("pmtai4","123456")
    //console.log(await account.acc.logIn())
    console.log(await account.acc.signUp())
    //console.log(await account.acc.logIn())

    //console.log( await account.loadInfo())
    //console.log(account.info)
    //console.log(account.info.setName("Pham Minh Tai"))
    //console.log(account.info.setAddress("123,456 duong a/b"))
    //await account.info.updateDatabase()
    //console.log(account.info)
    //console.log(await account.getListUser())
    //const a=await temp.setID(1)
    //temp.setGender("0")
    //temp.setBirth("11/26/2001")
    //temp.setMail("pmtai20@clc.fitus.edu.vn")
    //temp.setName("Pham Minh Tai")
    //temp.setPhone("0938394323")
    //temp.setAddress(" duong abc pho xyz  tinh binh duong")

    //console.log(temp)
    //const test= await temp.updateDatabase()
    //const a1=new User_info()
    //const data= await a1.setID(1)
    //console.log(a1)
    //console.log(data)
    //console.log(temp.setName("hello"))
    
        
}


    
//const a=temp.setID(2)

//test()
//test()
//var today = new Date("2022/2/31");
//var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
//console.log(date)
//console.log(JSON.stringify(today))

module.exports={UserManager,Access,User_info}