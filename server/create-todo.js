module.exports = async (req, res, db) => {
    const { text } = req.body;

    var todo = await db.addTodo({
        text,
        checked: false
    });

    res.json(todo);
}