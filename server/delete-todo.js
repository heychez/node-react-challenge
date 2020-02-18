module.exports = async (req, res, db) => {
    const { id } = req.params;

    await db.deleteTodoById(id);

    res.json(null);
}