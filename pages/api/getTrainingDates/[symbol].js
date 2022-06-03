import executeQuery from "../../../lib/db"

export default async(req,res)=>{
    if(req.method=="GET"){
        
        const {symbol} = req.query
        let result = await executeQuery({
            query: "SELECT DISTINCT trainingDate FROM "+symbol+";",
            values: null
        })
        res.status(200).json(result.map(d=>d["trainingDate"].toISOString()/*.split("T")[0]*/))
        
    }
}