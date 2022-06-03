import executeQuery from "../../../lib/db"

export default async(req,res)=>{
    if(req.method=="GET"){
        
        const {symbol} = req.query
        let result = await executeQuery({
            query: "SHOW TABLES"
        })
        res.status(200).json(result.map(r=>r["Tables_in_cap"]).filter(r=>r!="financesymbols"&&r!="users"))
        
    }
}