import React, {useState, useRef, useEffect, useLayoutEffect} from 'react'
import saveBlob from "./downloader";


export const WindowSize =  ()=> {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
}

function DragNDrop({data, fileList, resetDb}) {
    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);
    const [items, setItems] = useState([])


    React.useEffect(() => {
        setItems(fileList);
    }, [fileList.length]);

    useEffect(() => {
        setList(data);
    }, [setList, data])

    const dragItem = useRef();
    const dragItemNode = useRef();

    const handletDragStart = (e, item) => {
        console.log('Starting to drag', item)
        dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = item;

        setTimeout(() => {
            setDragging(true);
        }, 0)
    }
    const handleDragEnter = (e, targetItem) => {
        console.log('Entering a drag target', targetItem)
        if (dragItemNode.current !== e.target) {
            console.log('Target is NOT the same as dragged item')
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList[targetItem.grpI].items.splice(targetItem.itemI, 0, newList[dragItem.current.grpI].items.splice(dragItem.current.itemI, 1)[0])
                dragItem.current = targetItem;
                localStorage.setItem('List', JSON.stringify(newList));
                return newList
            })
        }
    }
    const handleDragEnd = (e) => {
        setDragging(false);
        dragItem.current = null;
        dragItemNode.current = null;
    }
    const getStyles = (item) => {
        if (dragItem.current.grpI === item.grpI && dragItem.current.itemI === item.itemI) {
            return "dnd-item overlay"
        }
        return "dnd-item"
    }

    let saver = () => {
        items.forEach(function (file, index) {
            saveBlob(file, index + 'file.jpg');
        });
    };

    if (items.length) {
        return (
            <div className="container dnd">
                <div className="saver-container">
                    <button onClick={resetDb} className="saver_btn-reset">reset</button>
                    <button onClick={saver} className="saver_btn">Save</button>
                </div>
                {list.map((grp, grpI) => (
                    <div key={grp.title}
                         onTouchStart={dragging && !grp.items.length ? (e) =>
                             handleDragEnter(e, {
                                 grpI,
                                 itemI: 0
                             }) : null}
                         onDragEnter={dragging && !grp.items.length ? (e) =>
                        handleDragEnter(e, {
                            grpI,
                            itemI: 0
                        }) : null}
                         className="dnd-container"
                         style={{height: Math.ceil(items.length / 3) * 313}}>

                        {grp.items.map((item, itemI) => (
                            <div draggable key={item}
                                 onTouchMoveCapture={(e) => handletDragStart(e, {grpI, itemI})}
                                 onTouchStartCapture={dragging ? (e) => {
                                     handleDragEnter(e, {grpI, itemI})
                                 } : null}
                                 onDragStart={(e) => handletDragStart(e, {grpI, itemI})}
                                 onDragEnter={dragging ? (e) => {
                                     handleDragEnter(e, {grpI, itemI})
                                 } : null}
                                 className={dragging ? getStyles({grpI, itemI}) : "dnd-item"}
                                 style={{backgroundImage: `url(${items[item]})`}}>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    } else  {
        return (
            <div className="container dnd">
                <div className="saver-container">
                    <button onClick={resetDb} className="saver_btn-reset">reset</button>
                    <button onClick={saver} className="saver_btn">Save</button>
                </div>
                <div className="dnd-container_empty">
                    <div className="dnd-item_empty">Photo</div>
                    <div className="dnd-item_empty">Photo</div>
                    <div className="dnd-item_empty">Photo</div>
                    <div className="dnd-item_empty">Photo</div>
                    <div className="dnd-item_empty">Photo</div>
                    <div className="dnd-item_empty">Photo</div>
                    <div className="dnd-item_empty">Photo</div>
                    <div className="dnd-item_empty">Photo</div>
                    <div className="dnd-item_empty">Photo</div>
                </div>
            </div>
        )
    }
}
export default DragNDrop;

