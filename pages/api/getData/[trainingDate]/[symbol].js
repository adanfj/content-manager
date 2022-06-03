import executeQuery from "../../../../lib/db"

export default async(req,res)=>{
    if(req.method=="GET"){
        
        const {trainingDate,symbol} = req.query
        let result = await executeQuery({
            query: "SELECT * FROM "+symbol+" WHERE TrainingDate=?",
            values: new Date(trainingDate)
        })
        res.status(200).json(result)
        
    }
}