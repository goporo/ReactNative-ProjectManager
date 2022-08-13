const { PrismaClient } = require('@prisma/client');
const { json } = require('express');
const prisma = new PrismaClient();
const { DataChecker, Message } = require('./DataChecker')
const checker = new DataChecker()

class Task_info {
    constructor() {
        this.proj_id =0
        this.task_id = 0
        this.task_name = ""
        this.task_status = "0"
        this.task_description = ""
        this.task_createday = new Date()
        this.task_deadline = new Date()
            // this.task_last_edit_time = task_last_edit_time
            // this.task_last_editor = task_last_editor
        this.task_creator = 0
            //this.task_emp = task_emp
    }

    async findNewID() {
        const oldTask = await prisma.TASK_INFO.
        aggregate({
            _min: {
                PJ_ID: true,
                TASK_ID: true
            },
            where: {
                TASK_NAME: ""
            },
        })
        if (oldTask._min && oldTask._min.PJ_ID > 0 && oldTask._min.TASK_ID > 0) {
            this.task_id = oldTask._min.TASK_ID
            await prisma.TASK_INFO.delete({
                where: {
                    task_id: this.task_id
                }
            })
        } else {
            const newID = await prisma.tASK_INFO.
            aggregate({
                _max: {
                    PJ_ID: true,
                    TASK_ID: true
                }
            })

            this.task_id = newID._max.TASK_ID + 1
        }
    }

    async delete(user) {
        if (this.task_id != 0 && this.task_creator == user.MEM_ID) {
            await prisma.TASK_INFO.delete({
                where: {
                    PJ_ID: this.proj_id,
                    TASK_ID: this.task_id
                }
            })
        } else {
            if (this.task_id == 0)
                return new Message(false, "Unknown task been called")
            else
                return new Message(true, "Not permitted to delete Task")
        }
    }

    async create(user) {
        if (this.proj_id == 0 && this.task_id == 0) {
            await this.findNewID()
            await prisma.TASK_INFO.create({
                data: {
                    PJ_ID: this.proj_id,
                    TASK_ID: this.task_id,
                    TASK_STATUS: "0",
                    TASK_NAME: this.task_name,
                    TASK_CREATEDAY: this.task_createday,
                    TASK_DEADLINE: this.task_deadline,
                    TASK_CREATOR: user.MEM_ID,
                }
            })


        }
    }
    async loadInfo(user) {
        var task = await prisma.tASK_INFO.findFirst({
            where: {
                PJ_ID: user.PJ_ID,
                TASK_ID: user.TASK_ID
            }
        })
        if (task) {
            this.proj_id = task.PJ_ID
            this.task_id = task.TASK_ID
            this.task_name = task.TASK_NAME
            this.task_status = task.TASK_STATUS
            this.task_description = task.TASK_DESCRIPTON
            this.task_createday = task.TASK_CREATEDAY
            this.task_deadline = task.TASK_DEADLINE
            this.task_creator = task_creator
            return new Message(true, "Success")
        } else
            return new Message(false, "Task Doesn't Exist")
    }
    setName(name) {
        if (checker.name(name)) {
            this.task_name = name
            return new Message(true, "Success")
        } else
            return new Message(false, "Task name is invalid")
    }
    setDeadline(day) {
        if (!checker.day(day))
            return new Message(false, "Day is invalid")
        var deadline = new Date(day)
        if (deadline < this.task_deadline)
            return new Message(false, "Deadline can be before the CreateDay")
        this.task_deadline = deadline
        return new Message(true, "Success")
    }
    setDescription(des) {
        this.task_description = des
        return new Message(true, "Success")
    }
    setStatus(stt) {
        if ((stt != "0") || (stt != "1"))
            return new Message(false, "Unknown status")
        this.task_status = stt
        return new Message(true, "Success")
    }
}

class Access {
    constructor(US_ID) {
        this.US_ID = US_ID
        this.PJ_ID = 0
        this.TASK_ID = 0
        this.US_POS = 0
    }
    async connect(projectID, taskID) {
        const data = await prisma.tASK_RESPONDSIPLE.findFirst({
            where: {
                PJ_ID: projectID,
                TASK_ID: taskID,
                MEM_ID: this.US_ID,
            }
        })
        if (data) {
            this.US_POS = data.MEM_POS
            this.PJ_ID = data.PJ_ID
            this.TASK_ID = data.TASK_ID
            return new Message(true, "Connect Success")
        } else
            return new Message(false, "Can't connect to this project")

    }
    async getTaskAccessibility() {
        return await prisma.tASK_ACCESSIBILITY.findFirst({
            where: {
                MEM_POS: this.US_POS,
            }
        })
    }
}
class Task_Member {
    constructor(mem) {
        this.member = mem
    }
    async addMember(memID) {
            var exist = await prisma.uSER_INFO.findFirst({
                where: {
                    US_ID: memID
                }
            })
            if (exist) {
                const accessibility = await this.member.getTaskAccessibility()
                if (accessibility.EDIT_MEM == "1") {
                    const mem_exist = await prisma.tASK_RESPONDSIPLE.findFirst({
                        where: {
                            PJ_ID: this.member.PJ_ID,
                            TASK_ID: this.member.TASK_ID,
                            MEM_ID: this.member.MEM_ID
                        }
                    })
                    console.log(mem_exist)
                    if (mem_exist) {
                        return new Message(false, "User has already been as task member")
                    } else {
                        await prisma.tASK_RESPONDSIPLE.create({
                            date: {
                                PJ_ID: this.member.PJ_ID,
                                TASK_ID: this.member.TASK_ID,
                                MEM_ID: memID
                            }
                        })
                        return new Message(true, "Success")
                    }
                }
            }
        }
        //async edit_pos(memID, pos)
}

class Task_Manager {
    constructor() {
        this.member = null
        this.task_member = null
        this.task_info = null
    }
    reset() {
        this.member = null
        this.task_member = null
        this.task_info = null
    }
    async connect(US_ID, PJ_ID, TASK_ID) {
        var user = new Access(US_ID)
        const message = await user.connect(PJ_ID, TASK_ID)
        if (message.success) {
            this.member = user
            return message
        } else
            return message
    }
    async getInfo() {
        return await prisma.tASK_INFO({
            where: {
                PJ_ID: this.member.PJ_ID,
                TASK_ID: this.connect.TASK_ID
            }
        })
    }
}
async function test(){
    const temp= new Task_info()
    await temp.findNewID()
    console.log(temp)
    console.log(await prisma.tASK_INFO.findMany({}))
}
test()