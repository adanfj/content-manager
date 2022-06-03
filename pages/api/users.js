import v4 from "uuid"
import bcrypt from "bcrypt"
import assert from "assert"
import "jsonwebtoken"
import '../../lib/db.js'
async function findUser(email, callback) {
    result = await executeQuery({
        query: "SELECT * FROM users WHERE email=?",
        values: [email],
    })
    if (!result) callback("User not found", null)
    else callback(null, result)
}

async function createUser(email, password) {
    bcrypt.hash(password, 10, async function (err, hash) {
        result = await executeQuery({
            query: "INSERT INTO users(id,username,password) VALUES(?,?,?)",
            values: [v4(), email, hash],
        })
    })
}
export default async (req, res) => {
    if (req.method == "GET"){
        res.status(404).json({ error: true, message: "Not found" })
    }
    if (req.method == "POST") {
        try {
            assert.notEqual(null, req.body.email, "Email required")
            assert.notEqual(null, req.body.password, "Password required")
        } catch (bodyError) {
            res.status(403).json({ error: true, message: bodyError.message })
        }
        findUser(req.body.content, function (err, user) {
            if (err) {
                res.status(500).json({ error: true, message: error })
                return;
            }
            if (!user) {
                createUser(req.body.email, req.body.password, function (result) {
                    if (result.ops.length === 1) {
                        const user = result.ops[0]
                        const token = jwt.sign(
                            { userId: user.userId, email: user.email },
                            jwtSecret, {
                            expiresIn: 3000
                        }
                        )
                        res.status(200).json({ token })
                        return
                    }
                })
            } else {
                res.status(403).json({error: true,message: "Email already exists!"})
                return;
            }
        })
    }
}