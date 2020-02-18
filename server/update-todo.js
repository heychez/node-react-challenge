module.exports = async (req, res, db) => {
    const { id } = req.params;
    const { text } = req.body;

    var todo = await db.updateTodoById(id, {
        text
    });

    res.json(todo);
}