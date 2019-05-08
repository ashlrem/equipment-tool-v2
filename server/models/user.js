import  mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    username: { type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 32
    },
    name: String,
    contactno: String,
    site: String,
    email: String,
    userlevel: String,
    accountstatus: String,
    updatedBy: String,
    dateUpdated: String,
})

export default mongoose.model('users', userSchema);