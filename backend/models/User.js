import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['owner', 'renter'], required: true },
  phone: { type: String, required: true },
  address: {
    country: { type: String },
    city: { type: String },
    pincode: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    addressLine3: { type: String },
    landmark: { type: String },
  },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

export default mongoose.model('User', userSchema);
