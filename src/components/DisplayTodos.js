import {connect} from "react-redux";
import {addTodos, completeTodos, removeTodos, updateTodos} from "../redux/reducer";
import {useState} from "react";
import TodoItem from "./TodoItem";
import {AnimatePresence, motion} from "framer-motion";

const mapStateToProps = state => {
    return {
        todos: state,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTodo: obj => dispatch(addTodos(obj)),
        removeTodo: id => dispatch(removeTodos(id)),
        updateTodo: obj => dispatch(updateTodos(obj)),
        completeTodo: id => dispatch(completeTodos(id)),
    }
}


const DisplayTodos = (props) => {

    const [sort, setSort] = useState('active');

    return (
        <div className="displaytodos">
            <div className="buttons">
                <motion.button
                    whileHover={{scale:1.1}}
                    whileTap={{scale:.9}}
                    onClick={()=>setSort('active')}>Active ({props.todos.filter(a => a.completed===false).length})</motion.button>
                <motion.button
                    whileHover={{scale:1.1}}
                    whileTap={{scale:.9}}
                    onClick={()=>setSort('completed')}>Completed ({props.todos.filter(a => a.completed===true).length})</motion.button>
                <motion.button
                    whileHover={{scale:1.1}}
                    whileTap={{scale:.9}}
                    onClick={()=>setSort('all')}>All ({props.todos.length})</motion.button>
            </div>
            <ul className='carDiv'>
                <AnimatePresence>
                    {
                        props.todos.length > 0 && sort === 'active' ?
                            props.todos.map(item => {
                                return (
                                    item.completed === false &&
                                    <TodoItem
                                        key={item.id}
                                        item={item}
                                        removeTodo={props.removeTodo}
                                        updateTodo={props.updateTodo}
                                        completeTodo={props.completeTodo}
                                    />
                                )
                            })
                            : null
                    }
                    {
                        props.todos.length > 0 && sort === 'completed' ?
                            props.todos.map(item => {
                                return (
                                    item.completed === true &&
                                    <TodoItem
                                        key={item.id}
                                        item={item}
                                        removeTodo={props.removeTodo}
                                        updateTodo={props.updateTodo}
                                        completeTodo={props.completeTodo}
                                    />
                                )
                            })
                            : null
                    }
                    {
                        props.todos.length > 0 && sort === 'all' ?
                            props.todos.map(item => {
                                return (
                                    <TodoItem
                                        key={item.id}
                                        item={item}
                                        removeTodo={props.removeTodo}
                                        updateTodo={props.updateTodo}
                                        completeTodo={props.completeTodo}
                                    />
                                )
                            })
                            : null
                    }
                </AnimatePresence>
            </ul>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
