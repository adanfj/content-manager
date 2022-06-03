import {spawn} from 'child_process'

export async function downloadFile() {
    var child = spawn("scp")
    child.stdin.write(process.env.SSH_USER + "@" + process.env.SSH_HOST + ":" + process.env.SSH_PATH + " " + process.env.LOCAL_PATH)
}