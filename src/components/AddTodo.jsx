import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../features/todoSlice"
import { motion } from "motion/react"
import { FaPlus } from "react-icons/fa"

function AddTodo() {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  const addTodoHandler = (e) => {
    e.preventDefault()
    if (input.trim()) {
      dispatch(addTodo(input))
      setInput("")
    }
  }

  return (
    <motion.form
      onSubmit={addTodoHandler}
      className="mt-12 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center max-w-lg mx-auto bg-white rounded-full overflow-hidden shadow-lg border border-indigo-100">
        <input
          type="text"
          className="flex-grow p-4 text-gray-700 focus:outline-none text-lg"
          placeholder="What's on your mind?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <motion.button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 focus:outline-none hover:from-indigo-600 hover:to-purple-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus className="text-xl" />
        </motion.button>
      </div>
    </motion.form>
  )
}

export default AddTodo

