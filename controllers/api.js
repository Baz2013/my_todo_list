const APIError = require('../rest').APIError;

const model = require('../model');

var db_todo = model.Todo;
var db_user = model.User;

var gid = 0;

function nextId() {
    gid ++;
    return 't' + gid;
}

var todos = [
    {
        id: nextId(),
        name: 'Learn Git',
        description: 'Learn how to use git as distributed version control'
    },
    {
        id: nextId(),
        name: 'Learn JavaScript',
        description: 'Learn JavaScript, Node.js, NPM and other libraries'
    },
    {
        id: nextId(),
        name: 'Learn Python',
        description: 'Learn Python, WSGI, asyncio and NumPy'
    },
    {
        id: nextId(),
        name: 'Learn Java',
        description: 'Learn Java, Servlet, Maven and Spring'
    }
];


module.exports = {
    'GET /api/todos': async (ctx, next) => {
        return db_todo.findAll({
        attributes: ['id', 'name', 'description']
    }).then(function(todo_list){
        ctx.rest({
            todos: todo_list
        });
    });

    },

    'POST /api/todos': async (ctx, next) => {
        var
            t = ctx.request.body,
            todo;
        if (!t.name || !t.name.trim()) {
            throw new APIError('invalid_input', 'Missing name');
        }
        if (!t.description || !t.description.trim()) {
            throw new APIError('invalid_input', 'Missing description');
        }
        todo = {
            id: nextId(),
            name: t.name.trim(),
            description: t.description.trim()
        };
        todos.push(todo);

        // console.log(`endTime is: ${new Date(t.endTime.trim()).getTime()}`);

        (async () => {
            var td = await db_todo.create({
            ownerId:'123456',
            name: t.name.trim(),
            description: t.description.trim(),
            endTime: new Date(t.endTime.trim()).getTime(),
            status: 1
            });
        console.log('created: ' + JSON.stringify(td));})();


        ctx.rest(todo);
    },

    'PUT /api/todos/:id': async (ctx, next) => {
        console.log(`put ${ctx.params.id}`);
        var t = ctx.request.body;

        return db_todo.update(
            {
                name: t.name,
                description: t.description
            },
            {where: {id: ctx.params.id}}
        ).then(function(res){
            ctx.rest({
                id: ctx.params.id,
                name: t.name,
                description: t.description
            });
        });

        // ctx.rest(todo);
    },

    'DELETE /api/todos/:id': async (ctx, next) => {
        var i, index = -1;
        return db_todo.destroy({
            where: {
                id: ctx.params.id
            }
        }).then(function (res){
            ctx.rest(res);
        });
        // if (index === -1) {
        //     throw new APIError('notfound', 'Todo not found by id: ' + ctx.params.id);
        // }
    }
}
