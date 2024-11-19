import Message from "../models/message.js";

var controller={
    save:async(req,res)=>{
        var params=req.body
        try {
            var message = new Message()
            message.message = params.message
            message.from = params.from
            await message.save()
            res.send('Mensaje creado correctamente')
        } catch (error) {
            console.log(error)
        }

    },
    getMessages:async(req,res)=>{
        try {
            var query = await Message.find({}).sort('-_id')
            res.send(query)
        } catch (error) {
            console.log(error)
        }
        
    }
}

export default controller