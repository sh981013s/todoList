import {useState} from "react";
import {connect} from "react-redux";
import {addTodos, completeTodos, removeTodos, updateTodos} from "../redux/reducer";
import {GoPlus} from 'react-icons/go';

const mapStateToProps = state => {
    return {
        todos: state,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTodo: obj => dispatch(addTodos(obj)),
/*        removeTodo: id => dispatch(removeTodos(id)),
        updateTodo: obj => dispatch(updateTodos(obj)),
        completeTodo: id => dispatch(completeTodos(id)),*/
    }
}

const Todos = (props) => {
    const [todo, setTodo] = useState('');

    const handleChange = (e) => {
        setTodo(e.target.value);
    }

    const add = () => {
        props.addTodo({
            id: Math.floor(Math.random()*1000),
            item: todo,
            completed: false,
        })
        setTodo('');
    }

    return (
        <div className='addTodos'>
            <input
                type="text"
                onChange={handleChange}
                className='todo-input'
                value={todo}
            />
            <button
                className='add-btn'
                onClick={() => {
                    add();
                }}
            >
                <GoPlus />
            </button>
            <br/>

        </div>
    )

}
export default connect(mapStateToProps,mapDispatchToProps)(Todos);
