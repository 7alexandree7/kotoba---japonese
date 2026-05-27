export const userNotPassword = (user) => {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
}