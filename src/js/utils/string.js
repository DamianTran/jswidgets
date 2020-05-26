function softMatch(str1, str2) {
    
    let reg1 = new RegExp(str1.replace(/\-/g, "\\-"), 'i');
    let reg2 = new RegExp(str2.replace(/\-/g, "\\-"), 'i');

    return reg1.test(str2) || reg2.test(str1);

}