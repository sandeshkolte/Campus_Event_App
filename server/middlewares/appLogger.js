
const appLogger = (req,res,next)=> {
    const url = req.url
    const method =req.method
    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleTimeString()

    const result =`${url} | ${method} | ${date} | ${time}`

    console.log(result)
    next()
}

module.exports= appLogger