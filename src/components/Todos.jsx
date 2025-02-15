import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { removeTodo, updateTodo } from "../features/todoSlice"
import { motion, AnimatePresence } from "motion/react"
import { FaEdit, FaTrash, FaSave, FaCheck } from "react-icons/fa"

function Todos() {
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")

  const handleEdit = (id, text) => {
    setEditId(id)
    setEditText(text)
  }

  const handleUpdate = (id) => {
    dispatch(updateTodo({ id, text: editText }))
    setEditId(null)
    setEditText("")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto px-4"
    >
      <h2 className="font-bold text-4xl mt-12 mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
        My Todo List
      </h2>
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 bg-white shadow-lg rounded-xl overflow-hidden border border-indigo-100"
          >
            <div className="p-4 flex justify-between items-center">
              {editId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-grow mr-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                />
              ) : (
                <span className="text-gray-800 flex-grow text-lg">{todo.text}</span>
              )}

              <div className="flex space-x-2">
                {editId === todo.id ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUpdate(todo.id)}
                    className="text-white bg-gradient-to-r from-green-400 to-green-500 p-2 rounded-full focus:outline-none hover:from-green-500 hover:to-green-600"
                  >
                    <FaSave className="text-lg" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className="text-white bg-gradient-to-r from-blue-400 to-blue-500 p-2 rounded-full focus:outline-none hover:from-blue-500 hover:to-blue-600"
                  >
                    <FaEdit className="text-lg" />
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-white bg-gradient-to-r from-red-400 to-red-500 p-2 rounded-full focus:outline-none hover:from-red-500 hover:to-red-600"
                >
                  <FaTrash className="text-lg" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default Todos

