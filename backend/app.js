const express = require('express');
const createError = require('http-errors');
const UserService=require('./User')
const ProjectService=require('./Project')
const morgan = require('morgan');
const {PrismaClient} =require('@prisma/client');
const { json } = require('express');
const {DataChecker, Message}= require('./DataChecker')
require('dotenv').config();
const prisma= new PrismaClient();
const checker=require('./DataChecker');
const { use } = require('./routes/api.route');
const app = express();
var cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors())
app.options('*', cors())
function toJson(data) {
  return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v);
}
app.post('/login', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", " POST");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  const us_service=new UserService.UserManager(req.body["US_ACCOUNT"],req.body["US_PASSWORD"])
  const US_NEWPASS=""
  
  res.json( {data:{},message:await us_service.acc.signUp()})
});
app.patch('/login', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", " PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  const us_service=new UserService.UserManager(req.body["access"]["US_ACCOUNT"],req.body["access"]["US_PASSWORD"])
  us_service.acc.user_id=req.body["access"]["US_ID"]
  us_service.acc.token=req.body["access"]["US_TOKEN"]
  res.json(await us_service.acc.changePass(req.body["access"]["US_PASSWORD"],req.body["US_NEWPASS"]))
});
app.put('/login', async (req, res, next) => {
  
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", " PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  
  console.log(req.body)
 console.log(req.body["US_ACCOUNT"],req.body["US_PASSWORD"])
  const us_service=new UserService.UserManager(req.body["US_ACCOUNT"],req.body["US_PASSWORD"])
  const message=await us_service.acc.logIn()
  if(message.success)
  {
        const data =(await prisma.uSER_ACCOUNT.findFirst({
          where:{
            US_ACCOUNT:req.body["US_ACCOUNT"],
            US_PASSWORD:req.body["US_PASSWORD"]
        },
          include:{
              USER_INFO:{
                include:{
                  PROJECT_MEMBER:{
                    include:{
                      PROJECT_INFO:{}
                    }
                  }
                }
              }
              
          }
      }))
 

  
      res.json({data,message})
  }
  else
    res.json({data:{},message})
}
);

app.put('/info', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", " PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  console.log(req.body)
  const us_service=new UserService.UserManager(req.body["US_ACCOUNT"],req.body["US_PASSWORD"])
  //us_service.acc.user_id=req.body["US_ID"]
  us_service.acc.token=req.body["US_TOKEN"]
  const message=await us_service.acc.logIn()
  if(req.body["US_ID"]==us_service.acc.user_id)
  {
  
  
 
  const data=await prisma.uSER_INFO.findFirst({
    where:{
      US_ID:req.body["US_ID"],
    },
  })
  if(!data)
    message= new Message(false,"User not exist")
    res.json({data,message})
  }

  
  else
  res.json({data:{},message:new Message(false,"User is not log in")})
});
app.post('/info', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", " POST");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  const us_service=new UserService.UserManager(req.body["access"]["US_ACCOUNT"],req.body["access"]["US_PASSWORD"])
  //us_service.acc.user_id=req.body["US_ID"]
  us_service.acc.token=req.body["access"]["US_TOKEN"]
  const message=await us_service.acc.logIn()
  if(req.body["access"]["US_ID"]==us_service.acc.user_id)
  {
  await us_service.info.setID(req.body["data"]["US_ID"])
  message.message="Information Update success"
  if(us_service.info.name!=req.body["data"]["US_NAME"])
  {
      var temp=us_service.info.setName(req.body["data"]["US_NAME"])
      if(temp.success==false){
        message.success=false
        if(message.success==true)
          message.message=temp.message
        else
          message.message+=temp.message
      }
  }
  if(us_service.info.mail!=req.body["data"]["US_MAIL"])
  {
      var temp=us_service.info.setMail(req.body["data"]["US_MAIL"])
      if(temp.success==false){
        message.success=false
        if(message.success==true)
          message.message=temp.message
        else
          message.message+=temp.message
      }
  }
  if(us_service.info.phone!=req.body["data"]["US_PHONE"])
  {
      var temp=us_service.info.setPhone(req.body["data"]["US_PHONE"])
      if(temp.success==false){
        message.success=false
        if(message.success==true)
          message.message=temp.message
        else
          message.message+=temp.message
      }
  }
  if(us_service.info.birth!=req.body["data"]["US_BIRTH"])
  {
      var temp=us_service.info.setBirth((req.body["data"]["US_BIRTH"]))
      if(temp.success==false){
        message.success=false
        if(message.success==true)
          message.message=temp.message
        else
          message.message+=temp.message
      }
  }
  if(us_service.info.gender!=(req.body["data"]["US_GENDER"]))
  {
      var temp=us_service.info.setGender(req.body["data"]["US_GENDER"])
      if(temp.success==false){
        message.success=false
        if(message.success==true)
          message.message=temp.message
        else
          message.message+=temp.message
      }
  }
  if(us_service.info.address!=(req.body["data"]["US_ADDRESS"]))
  {
      var temp=us_service.info.setAddress(req.body["data"]["US_ADDRESS"])
      if(temp.success==false){
        message.success=false
        if(message.success==true)
          message.message=temp.message
        else
          message.message+=temp.message
      }
  }  
  await us_service.info.updateDatabase()
  res.json({data:{},message})
  }
  else
  res.json({data:{},message:new Message(false,"User is not log in")})
});
app.put('/project', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", " PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  
  const project=new ProjectService.Project_Manager()
 
  const message= await project.connect(req.body["MEM_ID"],req.body["PJ_ID"])
  if(message.success)
  {
      
    const data=await prisma.pROJECT_MEMBER.findFirst({
      where:{
        PJ_ID:project.member.PJ_ID,
        MEM_ID:project.member.US_ID,
      },
      include:{
        PROJECT_INFO:{
          include:{
            LABELS:{
              include:{
                TASK_INFO:{
                  include:{
                    TASK_RESPONDSIPLE:{
                      include:{
                      PROJECT_MEMBER:{
                        include:{
                          USER_INFO:{
                            include:{
                              USER_ACCOUNT:true
                            }
                          }
                        }
                      }
                      }
                    },
                  }
                },
              }
            },
            PROJECT_MEMBERS:{
              include:{
                USER_INFO:{
                  include:{
                    USER_ACCOUNT:true
                  }
                }
              }
            }

            
          }
        },
 
        PROJECT_ACCESSIBILITY:true,
        
        
      }
    })
    const user= await prisma.uSER_INFO.findMany({
      include:{
        USER_ACCOUNT:true,
      }
    })
    res.json( {data,message,user})
  }
  else
  res.json( {data:{},message,user:{}})
});
app.post('/project', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", " POST");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  const user=new UserService.Access(req.body["access"]["US_ACCOUNT"],req.body["access"]["US_PASSWORD"])
  await user.logIn()
  if(user.user_id==req.body["access"]["US_ID"])
  {
  const user_project=new ProjectService.Access(user.user_id)
  const project=new ProjectService.Project_info()
  const message=new Message(true,"")
  var temp=project.setName(req.body["data"]["PJ_NAME"])
  if(!temp.success)
  {
      message.success=false
      message.message+="\n"+temp.message
  } 
  temp=project.setDeadline(req.body["data"]["PJ_DEADLINE"])
  if(!temp.success)
  {
      message.success=false
      message.message+="\n"+temp.message
  } 
  temp=project.setStatus(req.body["data"]["PJ_STATUS"])
  if(!temp.success)
  {
      message.success=false
      message.message+="\n"+temp.message
  } 
  temp=project.setOwner(req.body["data"]["PJ_OWNER"])
  if(!temp.success)
  {
      message.success=false
      message.message+="\n"+temp.message
  } 
  await project.create(user_project)
  res.json({data:{},message})
  }  
  else
  res.json({data:{},message: new Message(false,"Unknown user")})
});
app.put('/delete/project',async(req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", " PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  const project_service=new ProjectService.Project_Manager()
  const message=await project_service.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success){
    if(project_service.member.US_POS==0){
      await prisma.tASK_RESPONDSIPLE.deleteMany({
        where:{
          PJ_ID: project_service.member.PJ_ID
        }
      })
      await prisma.tASK_INFO.deleteMany({
        where:{
          PJ_ID: project_service.member.PJ_ID
        }
      })
      await prisma.lABEL.deleteMany({
        where:{
          PJ_ID: project_service.member.PJ_ID
        }
      })
      await prisma.pROJECT_INFO.update({
        where:{
          PJ_ID: project_service.member.PJ_ID
        },
        data:{
          PJ_NAME:"",
          PJ_ADMIN:null
        }
      })
      await prisma.pROJECT_MEMBER.deleteMany({
      where:{
        PJ_ID: project_service.member.PJ_ID
      }})
      res.json({data:{},message: new Message(true,"success")})
    }
    else
    res.json({data:{},message: new Message(false,"not allow to delete project")})
  }
  else
  res.json({data:{},message})
})
app.patch('/project', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", " PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  const project_service=new ProjectService.Project_Manager()
  const message=await project_service.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success)
  {
  message.message=""
  if(project_service.member.US_POS==0)
  {
        const project=new ProjectService.Project_info()
        await project.loadInfo(project_service.member)
        var temp=project.setName(req.body["data"]["PJ_NAME"])
        if(!temp.success)
        {
            message.success=false
            message.message+="\n"+temp.message
        } 
        temp=project.setDeadline(req.body["data"]["PJ_DEADLINE"])
        if(!temp.success)
        {
            message.success=false
            message.message+="\n"+temp.message
        } 
        temp=project.setStatus(req.body["data"]["PJ_STATUS"])
        if(!temp.success)
        {
            message.success=false
            message.message+="\n"+temp.message
        } 
        temp=project.setOwner(req.body["data"]["PJ_OWNER"])
        if(!temp.success)
        {
            message.success=false
            message.message+="\n"+temp.message
        } 
        await project.update()
        
        res.json({data:{},message})
      }
  }  
  else
  res.json({data:{},message})
});
app.post('/member', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", " POST");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  const project_service=new ProjectService.Project_Manager()
  var message=await project_service.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success){
    project_service.project_member=new ProjectService.Project_Member(project_service.member)
    const data= await prisma.uSER_ACCOUNT.findFirst({
      where:{
        US_ACCOUNT:req.body["data"]["US_ACCOUNT"]
      }
    })
    if(data)
    message=await project_service.project_member.addMember(data.US_ID)
    else
      message=new Message(false,"account not correct")
    res.json({data:{},message})
  }
  else
  res.json({data:{},message})
})
app.put('/delete/member', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", " PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  const project_service=new ProjectService.Project_Manager()
  var message=await project_service.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success&&project_service.member.US_POS<2){
    const member=new ProjectService.Project_Manager()
    message=await member.connect(req.body["data"]["MEM_ID"],req.body["data"]["PJ_ID"])
    if(message.success&&req.body["data"]["MEM_ID"]!=req.body["access"]["MEM_ID"])
    {
      await prisma.tASK_RESPONDSIPLE.deleteMany({
        where:{
          
            MEM_ID:member.member.US_ID,
            PJ_ID:member.member.PJ_ID
            
        }
      })
      await prisma.pROJECT_MEMBER.delete({
        where:{
          PJ_ID_MEM_ID:{
          MEM_ID:member.member.US_ID,
          PJ_ID:member.member.PJ_ID
          }
        }
      })
      res.json({data:{},message: new Message(true,"Success")})
      return
    }
    else
    {
    message.message="Member don't exist in the project"
    res.json({data:{},message})
    return
    }
  }
  else
  {
  if(!message.success)
  res.json({data:{},message})
  else
  res.json({data:{},message: new Message(false,"Not permit to delete member")})
  return
  }
})
app.patch('/member', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")  
  res.header("Access-Control-Allow-Methods", " PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type")

  const project_service=new ProjectService.Project_Manager()
  var message=await project_service.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success){
    project_service.project_member=new ProjectService.Project_Member(project_service.member)
    message =await project_service.project_member.edit_pos(req.body["data"]["MEM_ID"],req.body["data"]["MEM_POS"])
    res.json({data:{},message})
  }
  else
  res.json({data:{},message})
})
app.post('/label', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")  
  res.header("Access-Control-Allow-Methods", " POST");
  res.header("Access-Control-Allow-Headers", "Content-Type")

  const project_service=new ProjectService.Project_Manager()
  var message=await project_service.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success &&project_service.member.US_POS<2){
    const old= await prisma.lABEL.aggregate({
      _max:{
        LB_ID:true
      },
      where:{
        PJ_ID:req.body["access"]["PJ_ID"]
      }
    })
    if(old){
      const newLB_ID=old._max.LB_ID+1
      await prisma.lABEL.create({
        data:{
          PJ_ID:req.body["access"]["PJ_ID"],
          LB_ID: newLB_ID,
          LB_NAME:req.body["data"]["LB_NAME"]
        }
      })
      res.json({data:{},message})
      return}
    
    else{
      await prisma.lABEL.create({
        data:{
          PJ_ID:req.body["access"]["PJ_ID"],
          LB_ID:1,
          LB_NAME:req.body["data"]["LB_NAME"]
        }
      })
      res.json({data:{},message})
      return}
  }
  else
  {
    if (message.success)
    res.json({data:{},message: new Message(false,"Not permit to create Label")})
    else
    res.json({data:{},message})
  }
 
})
app.put('/label', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")  
  res.header("Access-Control-Allow-Methods", " POST");
  res.header("Access-Control-Allow-Headers", "Content-Type")

  const project_service=new ProjectService.Project_Manager()
  var message=await project_service.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success ){
      const data= await prisma.lABEL.findMany({
        where:{
          PJ_ID:req.body["access"]["PJ_ID"],
        },
        include:{
          TASK_INFO:true,
        }
      })
      res.json({data,message})
    

     
  }
  else
  {
    
    res.json({data:{},message})
  }
 
})
app.put('/delete/label', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")  
  res.header("Access-Control-Allow-Methods", " PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type")

  const project_service=new ProjectService.Project_Manager()
  var message=await project_service.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success &&project_service.member.US_POS<2){

      const task=await prisma.tASK_INFO.findMany({
        where:{
          PJ_ID:req.body["access"]["PJ_ID"],
          TASK_LABEL:req.body["data"]["LB_ID"],
        },
        select:{
          TASK_ID:true
        }
      })
      if (task.length>0){
      for (i=0;i<task.length;i++)
      await prisma.tASK_RESPONDSIPLE.deleteMany({
        where:{
          PJ_ID:req.body["access"]["PJ_ID"],
          TASK_ID:task[i].TASK_ID
        }
      })

      await prisma.tASK_INFO.deleteMany({
        where:{
          PJ_ID:req.body["access"]["PJ_ID"],
          TASK_LABEL:req.body["data"]["LB_ID"],
        }

      })}
      if ( await prisma.lABEL.findFirst({
        where:{
         
          PJ_ID:req.body["access"]["PJ_ID"],
          LB_ID:req.body["data"]["LB_ID"]}
        
      }))
      await prisma.lABEL.delete({
        where:{
          PJ_ID_LB_ID:{
          PJ_ID:req.body["access"]["PJ_ID"],
          LB_ID:req.body["data"]["LB_ID"]}
        }
      })
      
      res.json({data:{},message})
  }
  else
  {
    if (message.success)
    res.json({data:{},message: new Message(false,"Not permit to create Label")})
    else
    res.json({data:{},message})
  }
 
})
app.patch('/label', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")  
  res.header("Access-Control-Allow-Methods", " PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type")

  const project_service=new ProjectService.Project_Manager()
  var message=await project_service.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success &&project_service.member.US_POS<2){

      
      if ( await prisma.lABEL.findFirst({
        where:{
         
          PJ_ID:req.body["access"]["PJ_ID"],
          LB_ID:req.body["data"]["LB_ID"]}
        
      }))
      {
      await prisma.lABEL.update({
        where:{
          PJ_ID_LB_ID:{
          PJ_ID:req.body["access"]["PJ_ID"],
          LB_ID:req.body["data"]["LB_ID"]}
        },
        data:{
          LB_NAME:req.body["data"]["LB_NAME"]
        }
      })
      
      res.json({data:{},message})
    }
    else
    res.json({data:{},message: new Message(false,"Label didn't exist")})
  }
  else
  {
    if (message.success)
    res.json({data:{},message: new Message(false,"Not permit to create Label")})
    else
    res.json({data:{},message})
  }
 
})
app.post('/task', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")  
  res.header("Access-Control-Allow-Methods", " POST");
  res.header("Access-Control-Allow-Headers", "Content-Type")

  const project_service=new ProjectService.Project_Manager()
  var message=await project_service.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success &&project_service.member.US_POS<2){
    const old= await prisma.tASK_INFO.aggregate({
      _max:{
        TASK_ID:true
      },
      where:{
        PJ_ID:req.body["access"]["PJ_ID"]
      }
    })
    if(old){
      const newTask_ID=old._max.TASK_ID+1
      await prisma.tASK_INFO.create({
        data:{
          PJ_ID:req.body["access"]["PJ_ID"],
          TASK_ID: newTask_ID,
          TASK_STATUS: '0',
          TASK_NAME: req.body["data"]["TASK_NAME"],
          TASK_DESCRIPTION: req.body["data"]["TASK_DESCRIPTION"],
          TASK_CREATEDAY: new Date (req.body["data"]["TASK_CREATEDAY"]),
          TASK_DEADLINE: new Date(req.body["data"]["TASK_DEADLINE"]),
          TASK_CREATOR: req.body["access"]["MEM_ID"],
          TASK_LABEL: req.body["data"]["TASK_LABEL"]
        }
      })
      res.json({data:{},message})}
    
    else{
      await prisma.tASK_INFO.create({
        data:{
          PJ_ID:req.body["access"]["PJ_ID"],
          TASK_ID: 1,
          TASK_STATUS: req.body["data"]["TASK_STATUS"],
          TASK_NAME: req.body["data"]["TASK_NAME"],
          TASK_DESCRIPTION: req.body["data"]["TASK_DESCRIPTION"],
          TASK_CREATEDAY: new Date (req.body["data"]["TASK_CREATEDAY"]),
          TASK_DEADLINE: new Date(req.body["data"]["TASK_DEADLINE"]),
          TASK_CREATOR: req.body["access"]["MEM_ID"],
          TASK_LABEL: req.body["data"]["TASK_LABEL"]
        }
      })
      res.json({data:{},message})}
  }
  else
  {
    if (message.success)
    res.json({data:{},message: new Message(false,"Not permit to create Task")})
    else
    res.json({data:{},message})
  }
 
})
app.put('/delete/task', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")  
  res.header("Access-Control-Allow-Methods", " PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type")

  const project_service=new ProjectService.Project_Manager()
  var message=await project_service.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success &&project_service.member.US_POS<2){
    if (await prisma.tASK_RESPONDSIPLE.findMany({
      where:{
        PJ_ID:req.body["access"]["PJ_ID"],
        TASK_ID:req.body["data"]["TASK_ID"]
      }
    }))
    await prisma.tASK_RESPONDSIPLE.deleteMany({
      where:{
        PJ_ID:req.body["access"]["PJ_ID"],
        TASK_ID:req.body["data"]["TASK_ID"]
      }
    })
    if( await prisma.tASK_INFO.findMany({
      where:{
        PJ_ID:req.body["access"]["PJ_ID"],
        TASK_ID:req.body["data"]["TASK_ID"]
      }
    }))
    {
    
    await prisma.tASK_INFO.deleteMany({
      where:{
        PJ_ID:req.body["access"]["PJ_ID"],
        TASK_ID:req.body["data"]["TASK_ID"]
      }
    })
    res.json({data:{},message: new Message(true,"success")})
  }
    else
    res.json({data:{},message: new Message(false,"Task is not exist")})
    
  }
  else
  {
    if (message.success)
    res.json({data:{},message: new Message(false,"Not permit to delete Task")})
    else
    res.json({data:{},message})
  }
 
})
app.patch('/task', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")  
  res.header("Access-Control-Allow-Methods", " POST");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  
  const project_service=new ProjectService.Project_Manager()
  var message=await project_service.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success &&project_service.member.US_POS<2){
    
    const task= await prisma.tASK_INFO.findFirst({
      where:
      {
      PJ_ID:req.body["access"]["PJ_ID"],
      TASK_ID:req.body["data"]["TASK_ID"]
    }}) 
    if (task){
      await prisma.tASK_INFO.updateMany({
        where:{
         
          PJ_ID:req.body["access"]["PJ_ID"],
          TASK_ID:req.body["data"]["TASK_ID"],
          
        },
        data:{
        
          TASK_STATUS: req.body["data"]["TASK_STATUS"],
          TASK_NAME: req.body["data"]["TASK_NAME"],
          TASK_DESCRIPTION: req.body["data"]["TASK_DESCRIPTION"],
          TASK_CREATEDAY: new Date (req.body["data"]["TASK_CREATEDAY"]),
          TASK_DEADLINE: new Date(req.body["data"]["TASK_DEADLINE"]),
          TASK_CREATOR: req.body["access"]["MEM_ID"],
          TASK_LABEL: req.body["data"]["TASK_LABEL"]
        }
      })
      res.json({data:{},message: new Message(true,"success")})
    }
    else
    res.json({data:{},message: new Message(false,"Task is not exist")})
  }
  else
  {
    if (message.success)
    res.json({data:{},message: new Message(false,"Not permit to create Task")})
    else
    res.json({data:{},message})
  }
 
})
app.post('/taskmember', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", " POST");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  const admin=new ProjectService.Project_Manager()
  var message=await admin.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success&&admin.member.US_POS<2){
    const member =new ProjectService.Project_Manager()
    message=await member.connect(req.body["member"]["MEM_ID"],req.body["member"]["PJ_ID"])
    if(message){
      const task=await prisma.tASK_INFO.findFirst({
        where:{
        PJ_ID:req.body["access"]["PJ_ID"],
        TASK_ID:req.body["data"]["TASK_ID"]
        }
      })
      if(task){
        const exist=await prisma.tASK_RESPONDSIPLE.findFirst({
          where:{
          PJ_ID:req.body["access"]["PJ_ID"],
          TASK_ID:req.body["data"]["TASK_ID"],
          MEM_ID:req.body["member"]["MEM_ID"]
        }
        })
        if(!exist)
        {
          await prisma.tASK_RESPONDSIPLE.create({
            data:{
              PJ_ID:req.body["access"]["PJ_ID"],
              TASK_ID:req.body["data"]["TASK_ID"],
              MEM_ID:req.body["member"]["MEM_ID"]
            }
          })
          res.json({data:{},message: new Message(true,"assigned success")})
        }
        else{
          res.json({data:{},message: new Message(false,"member has been assigned to task")})
        }
      }
      else
      res.json({data:{},message: new Message(false,"task doesn't exist")})
    }
    else
    res.json({data:{},message: new Message(false,"member doesn't exist")})
  }
  else
  if(message.success)
  res.json({data:{},message: new Message(false,"not allow to assign task")})
  else
  res.json({data:{},message})
})
app.put('/delete/taskmember', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", " PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type")
  const admin=new ProjectService.Project_Manager()
  var message=await admin.connect(req.body["access"]["MEM_ID"],req.body["access"]["PJ_ID"])
  if(message.success&&admin.member.US_POS<2){
    const member =new ProjectService.Project_Manager()
    message=await member.connect(req.body["member"]["MEM_ID"],req.body["member"]["PJ_ID"])
    if(message){
      const task=await prisma.tASK_INFO.findFirst({
        where:{
        PJ_ID:req.body["access"]["PJ_ID"],
        TASK_ID:req.body["data"]["TASK_ID"]
        }
      })
      if(task){
        const exist=await prisma.tASK_RESPONDSIPLE.findFirst({
          where:{
          PJ_ID:req.body["access"]["PJ_ID"],
          TASK_ID:req.body["data"]["TASK_ID"],
          MEM_ID:req.body["member"]["MEM_ID"]
        }
        })
        if(exist)
        {
          await prisma.tASK_RESPONDSIPLE.deleteMany({
            where:{
              PJ_ID:req.body["access"]["PJ_ID"],
              TASK_ID:req.body["data"]["TASK_ID"],
              MEM_ID:req.body["member"]["MEM_ID"]
            }
          })
          res.json({data:{},message: new Message(true,"unassign success")})
        }
        else{
          res.json({data:{},message: new Message(false,"member hasn't been assigned to task")})
        }
      }
      else
      res.json({data:{},message: new Message(false,"task doesn't exist")})
    }
    else
    res.json({data:{},message: new Message(false,"member doesn't exist")})
  }
  else
  if(message.success)
  res.json({data:{},message: new Message(false,"not allow to unassign task")})
  else
  res.json({data:{},message})
})
app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});
app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
