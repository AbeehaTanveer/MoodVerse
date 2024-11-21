const { Todo } = require("../Model/modelSchema");

const addTodo = async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data);

    if (!req.body) {
      return res.status(404).json({ msg: "Data not find" });
    }
    const createData = new Todo({ data });
    const saveData = await createData.save();
    res.status(200).json(saveData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getTodo = async (req, res) => {
  try {
    const findData = await Todo.find();
    res.status(200).json(findData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const DeleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const findId = await Todo.findById(id);
    console.log("yes Id is FInd in the Database", findId);

    if (!findId) {
      return res.status(404).json({ msg: "not Find Id which you send" });
    }

    const deleteData = await Todo.findByIdAndDelete(id);
    res.status(200).json({ msg: "Data Delete Successfully", deleteData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const existData = await Todo.findById(id);
    if (!existData) {
      return res
        .status(400)
        .json({ mgs: "The data is not available in the DataBase" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ mgs: "Kindly Send the data ?" });
    }
    const updateData = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { addTodo, getTodo, DeleteTodo, updateTodo };
