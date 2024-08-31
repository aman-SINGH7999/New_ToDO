const express = require('express')
const router = express.Router();
const Notes = require('./models')

router.get("/get-all-notes/:page/:searchkey", async (req, res)=>{
    console.log(req.params)
    const page = req.params.page;
    const searchkey = req.params.searchkey;
    try{
        const count = await Notes.find().countDocuments();
        const data = await Notes.find(
            {"$or":[
                {"title" : {$regex:searchkey}},
                {"description" : {$regex:searchkey}},
            ]}
        ).skip((page-1)*5).limit(5);
        return res.json({
            notes : data,
            total_count : count,
            success : true,
        })
    }catch(err){
        console.log(err);
        res.json({
            success : false,
            message : "Something went wrong!",
        })
    }
});

router.get("/get-all-notes/:page", async (req, res)=>{
    console.log(req.params)
    const page = req.params.page;
    try{
        const count = await Notes.find().countDocuments();
        const data = await Notes.find().skip((page-1)*5).limit(5);
        return res.json({
            notes : data,
            total_count : count,
            success : true,
        })
        
    }catch(err){
        console.log(err);
        res.json({
            success : false,
            message : "Something went wrong!",
        })
    }
});

router.get("/get-one-note/:id", async (req, res)=>{
    const id = req.params.id;
    try{
        const data = await Notes.findOne({_id:id});
        res.json({
            notes : data,
            success : true,
        })
    }catch(err){
        console.log(err);
        res.json({
            success : false,
            message : "Something went wrong!",
        })
    }
});

router.post("/add-note", async (req, res)=>{
    const {title, description} = req.body;
    try{
        const notes = new Notes({title, description})
        const data = await notes.save();
        res.json({
            notes : data,
            success : true,
        })
    }catch(err){
        console.log(err);
        res.json({
            success : false,
            message : "Something went wrong!",
        })
    }
})

router.put("/update-note/:id", async (req, res)=>{
    const {title, description} = req.body;
    const id = req.params.id;
    console.log(id);
    console.log(title);
    console.log(description);
    try{
        const data = await Notes.findOneAndUpdate({_id : id}, {title, description}, {new:true});
        res.json({
            notes : data,
            success : true,
        })
    }catch(err){
        console.log(err);
        res.json({
            success : false,
            message : "Something went wrong!",
        })
    }
})

router.delete("/delete-note/:id", async (req, res)=>{
    const id = req.params.id;
    try{
        const data = await Notes.findOneAndDelete({_id : id});
        res.json({
            notes : data,
            success : true,
        })
    }catch(err){
        console.log(err);
        res.json({
            success : false,
            message : "Something went wrong!",
        })
    }
})



module.exports = router;