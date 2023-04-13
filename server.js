let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
const { async } = require("plugins/iterators");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/todo-list', {
	useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	task: {
		type: String,
		required: true
	}
});

const Todo = mongoose.model("Todo", TodoSchema);

app.get("/api/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})

app.post("/api/todos/new", (req, res)=>{

    const todos = new Todo({
        task: req.body.task
    })
    todos.save();
    res.json(todos);
})

app.delete("/api/todos/delete/:id", async (req, res)=>{

    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
})

app.listen(5000, ()=>{
    console.log("App listening at port 5000");
});

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build/index.html"));
});