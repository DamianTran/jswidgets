export function softMatch(str1, str2) {
    
    let reg1 = new RegExp(str1.replace(/\-/g, "\\-"), 'i');
    let reg2 = new RegExp(str2.replace(/\-/g, "\\-"), 'i');

    return reg1.test(str2) || reg2.test(str1);

}

export function mod10(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) == 0;
}