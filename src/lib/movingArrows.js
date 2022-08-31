const movingArrows = (event, id, itemRefs, countOfElems) => {
    // itemRefs - массив элементов, по которым можно перемещаться по стрелкам
    
    if (event.code == 'ArrowDown' || event.code == 'ArrowLeft') {
        if (id === 0){ return; }
        itemRefs.current[id - 1].focus();

    } else if (event.code == 'ArrowUp' || event.code == 'ArrowRight'){
        if (id === countOfElems - 1){ return; }
        itemRefs.current[id + 1].focus();
    }
}

 export default movingArrows;