import {useRef} from "react";
import {AiFillEdit, IoCheckmarkDoneSharp, IoClose} from "react-icons/all";
import {motion} from 'framer-motion';

const TodoItem = (props) => {

    const {item, updateTodo} = props;

    const inputRef = useRef(true);

    const changeFocus = () => {
        inputRef.current.disabled = false;
        inputRef.current.focus();
    };

    const update = (id,value,e) => {
        if(e.which === 13) {
            updateTodo({
                id,
                item: value
            })
            inputRef.current.disabled = true;
        }
    };

    return (
        <motion.li
            key={item.id}
            className='card'
            initial={{x:'150vw', transition: {type:'spring', duration:2}}}
            animate={{x:'0', transition: {type:'spring', duration:2}}}
            whileHover={{
                scale:1.1,
                transition: {type:'spring', duration:.1}
            }}
            exit={{
                x: '-69vw',
                scale: [1,0],
                transition: {duration:.5},
                background: 'rgba(255,0,0,1)'
            }}
        >
            <textarea
                ref={inputRef}
                disabled={inputRef}
                defaultValue={item.item}
                onKeyPress={(e) => {
                    update(item.id, inputRef.current.value, e)
                }}
            />
            <div className="btns">
                <motion.button
                    whileHover={{scale:1.4}}
                    whileTap={{scale:.9}}
                    onClick={changeFocus}
                >
                    <AiFillEdit />
                </motion.button>
                {
                    item.completed === false && (
                        <motion.button
                            whileHover={{scale:1.4}}
                            whileTap={{scale:.9}}
                            style={{color:'green'}}
                            onClick={() => {
                                props.completeTodo(item.id);
                            }}
                        >
                            <IoCheckmarkDoneSharp />
                        </motion.button>
                    )
                }
                <motion.button
                    whileHover={{scale:1.4}}
                    whileTap={{scale:.9}}
                    style={{color:'red'}}
                    onClick={() => props.removeTodo(item.id)}
                >
                    <IoClose />
                </motion.button>
            </div>
            { item.completed && <span className='completed'>done</span> }
        </motion.li>
    )
};

export default TodoItem;
