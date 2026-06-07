export const testAdminRoute = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "access granted to admin route",
        data: req.user
    })
}