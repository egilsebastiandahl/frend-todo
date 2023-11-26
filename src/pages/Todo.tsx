import { useEffect, useState } from "react"
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../styles/pages/Todo.css"
import { Item } from "../lib/item-model"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextareaAutosize, ThemeProvider } from "@mui/material"
import { v4 as uuidv4 } from 'uuid';
import ListItem from "../components/ListItem/ListItem"
import { ListFilter } from "../lib/list-filter.enum"
import { createMaterialTheme } from "../utils/material-theme"
import logo from '../assets/frend_logo.jpg'

const TODO_LIST = "todo-list";
const todoListFromLocalStorage = JSON.parse(localStorage.getItem(TODO_LIST) ?? "[]");

function Todo() {
    // The list of "to-do" items
    const [todoList, setTodoList] = useState<Item[]>(todoListFromLocalStorage);

    // The text which may be added to new items
    const [newItemText, setNewItemText] = useState("");

    // The filter used for filtering the to-do list
    const [listFilter, setListFilter] = useState(ListFilter.ALL);

    // Updates local storage on todoList data changes
    useEffect(() => {
        localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
    }, [todoList])

    // Adds a new item to the todo-list
    const addNewItem = () => {
        setTodoList([...todoList, { text: newItemText, completed: false, id: uuidv4() }]);
        setNewItemText("");
    }

    // Remove item from the todo-list
    const removeItem = (item: Item) => {
        setTodoList(todoList.filter(entity => entity.id != item.id))
    }

    // Save updates done to the given item
    const saveItem = (item: Item) => {
        const indexToUpdate = todoList.findIndex(entity => entity.id == item.id)
        if (indexToUpdate != -1) {
            const newToDoList = [...todoList];
            newToDoList[indexToUpdate] = item;
            setTodoList(newToDoList);
        } else {
            console.error("Trying to update an item which doesn't exist")
        }
    }

    // update the filter selection when a new selection is made. Make sure the value is not string
    const handleFilterSelectionChange = (event: SelectChangeEvent<typeof listFilter>) => {
        if (typeof (event.target.value) !== "string") setListFilter(event.target.value);
    };


    // sort function which returns
    const sortBasedOnFilter = (a, b): number => {
        // Sort by completion status (incomplete items comes first)
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        // Return 0 when both items are completed or both items are incomplete
        return 0;
    }

    // create a sorted and filtered list to display items from
    const sortedToDoList = todoList.filter(entity => {
        if (listFilter === ListFilter.ONLY_COMPLETED) {
            return entity.completed;
        } else if (listFilter === ListFilter.ONLY_TODO) {
            return !entity.completed;
        } else {
            return true;
        }
    }).sort(sortBasedOnFilter);


    return (
        <>
            <div className="logo-container">
                <img className="logo" src={logo} height={100}></img>
            </div>
            {/* <h2 style={{ textAlign: "center" }}>ULTIMATE TODO 3000</h2> */}
            <div className="todo-container">
                <ThemeProvider theme={createMaterialTheme()}>
                    <FormControl variant="standard">
                        <InputLabel id="select-filter-label">Filter</InputLabel>
                        <Select className="filter-select" onChange={handleFilterSelectionChange} sx={{ color: "#0B0426" }} labelId="select-filter-label" id="select-filter" value={listFilter}>
                            <MenuItem value={ListFilter.ALL}>Show all</MenuItem>
                            <MenuItem value={ListFilter.ONLY_COMPLETED}>Show completed</MenuItem>
                            <MenuItem value={ListFilter.ONLY_TODO}>Show incomplete</MenuItem>
                        </Select>
                    </FormControl>
                </ThemeProvider>

                <div className="list-container">
                    {sortedToDoList.map((item) => {
                        return (
                            <ListItem key={item.id} item={item} onRemoveClick={removeItem} onSaveClick={saveItem}></ListItem>
                        )
                    }).sort(sortBasedOnFilter)}
                </div>

                <div className="new-item-container">
                    <TextareaAutosize placeholder="Please enter text..." value={newItemText} onKeyDown={event => event.key === "Enter" && newItemText.length > 0 ? addNewItem() : ""} onChange={e => setNewItemText(e.target.value)}></TextareaAutosize>
                    <button disabled={newItemText.length < 1} onClick={addNewItem} className="add-new-button"><FontAwesomeIcon className="icon-color" icon={faPlus}></FontAwesomeIcon></button>
                    {/* <button disabled={!(/^\S+$/.test(newItemText))} onClick={addNewItem} className="add-new-button"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button> */}
                </div>
            </div>
        </>
    )
}

export default Todo