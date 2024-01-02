const sorter = (valueA, valueB) => {
    let targetA = valueA != null && valueA.toString().toLowerCase();
    let targetB = valueB != null && valueB.toString().toLowerCase();
    return targetA != null && targetA.localeCompare ? targetA.localeCompare(targetB) : targetA - targetB;
};

export default sorter;
