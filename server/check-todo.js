module.exports = async (req, res, db) => {
    const { id } = req.params;

    var todo = await db.getTodoById(id);
    console.log(todo)
    todo = await db.updateTodoById(id, {
        checked: !todo.checked
    });

    res.json(todo);
}