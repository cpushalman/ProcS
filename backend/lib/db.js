import mongoose from "mongoose";

export const ConnectDB = async () => {

try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongo connection Success , Host : " + conn.connection.host);
    
} catch (error) {
    console.log(error)
}

};
