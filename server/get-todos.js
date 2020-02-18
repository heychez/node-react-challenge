module.exports = async (req, res, db) => {
    var todos = await db.getTodos();

    res.json(todos);
}