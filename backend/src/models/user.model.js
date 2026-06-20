import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

    studyStreak: { type: Number, default: 0 },
    lastStudyDate: { type: Date },

}, { timestamps: true });


userSchema.pre("findOneAndDelete", async function (next) {
    try {
        const user = await this.model.findOne(this.getFilter());
        if (user) {
            await mongoose.model("Word").deleteMany({ user: user._id })
        }

        next();

    } catch (error) {
        next(error);
    }

})

export const User = mongoose.model("User", userSchema);