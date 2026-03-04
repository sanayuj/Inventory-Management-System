const mongoose = require("mongoose")
mongoose.set('strictQuery', true)

module.exports = {

    dbConnect: async () => {
        const uri ="mongodb://127.0.0.1:27017/Inventory-Management-System"
        try {
            await mongoose.connect(uri).then(() => {
                console.log("Database connected succefully")
            })
        } catch (err) {
            console.log(err)
        }
    },


}