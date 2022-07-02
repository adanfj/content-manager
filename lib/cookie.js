export const setCookie = (cname,cvalue,exdays)=>{
    const d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000))
    let expires = "expires="+d.toUTCString()
    document.cookie=cname+"="+cvalue+";"+expires+";path=/"
}

export const getCookie = cname=>{
    let name = cname+"="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(";")
    for (i=0;i<ca.length;i++)
    {
        c=ca[i]
        while (c.charAt(0)=='') c = c.substring(1)
        if (c.indexOf(name)==0) return c.substring(name.length,c.length)
    }
    return ""
}

export const checkCookie = cname=>{
    return true
    let uname = getCookie(cname)
    return uname!=""&&uname!=null
}