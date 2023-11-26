import { useState } from "react"
import "./ListItem.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSave } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { TextareaAutosize } from "@mui/material";
import { Item } from "../../lib/item-model";

interface ListItemProps {
    item: Item,
    onRemoveClick: (itemToRemove: Item) => void,
    onSaveClick: (itemToSave: Item) => void
}

const ListItem = ({ item, onRemoveClick, onSaveClick }: ListItemProps) => {
    // keeps track of wether an Item is currently being edited
    const [isBeingEdited, setIsBeingEdited] = useState(false);

    // the current text of the item
    const [text, setText] = useState(item.text);

    // save the new text to the item and emit onSaveClick to parent
    const saveItem = () => {
        const newItem = item;
        newItem.text = text;
        onSaveClick(newItem);
        setIsBeingEdited(false);
    }

    // mark the item as completed
    const completeItem = () => {
        const newItem = item;
        newItem.completed = !item.completed;
        onSaveClick(newItem);
    }

    return (
        <>
            <div className="item-row">
                <div className="item-content">
                    <FontAwesomeIcon className={item.completed? "icon completed-color" : "icon"} icon={item.completed? faCheck : faCircle} onClick={() => completeItem()}></FontAwesomeIcon>
                    {isBeingEdited ? <TextareaAutosize value={text} onKeyDown={event => event.key === "Enter" && text.length > 0 ? saveItem() : ""} onChange={e => setText(e.target.value)}></TextareaAutosize> : <p onClick={() => (setIsBeingEdited(true))}>{item.completed ? <s className="completed-color">{text}</s> : text}</p>}
                </div>
                <div className="action-buttons">
                    <button style={{ marginRight: '5px' }} onClick={() => isBeingEdited ? saveItem() : setIsBeingEdited(!isBeingEdited)}>{isBeingEdited ? <FontAwesomeIcon className="icon-color" icon={faSave}></FontAwesomeIcon> : <FontAwesomeIcon className="icon-color" icon={faEdit}></FontAwesomeIcon>} </button>
                    <button disabled={isBeingEdited} onClick={() => onRemoveClick(item)}><FontAwesomeIcon className="icon-color" icon={faRemove}></FontAwesomeIcon></button>
                </div>
            </div>
        </>
    )
}

export default ListItem