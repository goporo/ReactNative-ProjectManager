 class DataChecker{

    constructor(){

    }
     username(input){
        
        //not include the special character
        var myRegex=/\w+/

        if(input.length>0&&myRegex.exec(input)){
            return myRegex.exec(input)[0].length==input.length
        }
        return false
        
    }
      password(input){
        //not include the space
        var myRegex=/\S+/
        if(input.length>0&&myRegex.exec(input)){
            
            
            return myRegex.exec(input)[0].length==input.length
        }
        return false
    }
     token(input){
        var myRegex=/d+/
        //a number with 10 character
        if(input.length==10&&myRegex.exec(input))
        {
            
             return myRegex.exec(input)[0].length==input.length
        }
        else 
        return false
    }
     name(input){
        var myRegex=/[a-zA-Z0-9\s]+/
        //only word and space

        if(input.length>0&& myRegex.exec(input)){
            
            
            return myRegex.exec(input)[0].length==input.length
        }
        return false
    }
     phone(input){
        var myRegex=/\d+/
        //a number with 10 character

        if(input.length==10&&myRegex.exec(input))
        {
           
             return myRegex.exec(input)[0].length==input.length
        }
        else 
        return false
    }
     day(input){
        //month/day/year
        var myRegex=/\d\d\/\d\d\/\d+/
        if(input&&input.length>0&&myRegex.exec(input)&&myRegex.exec(input)[0].length==input.length){
            if((new Date(input)).getDate()>0)
                return true         
            else
                return false
        }
        else
            return false    
    }
     email(input){
        var myRegex=/\w+@[\w.]+.[a-zA-Z]+/
        if(input.length>0&&myRegex.exec(input))
            return myRegex.exec(input)[0].length==input.length
        else
            return false
    }
    address(input){
        var myRegex=/[\w,\/ ]+/
        if(input.length>0&&myRegex.exec(input))
            return myRegex.exec(input)[0].length==input.length
        else
            return false
    }
    
}
class Message{
    constructor(success,message){
        this.success=success
        this.message=message
    }
}
module.exports={DataChecker,Message}