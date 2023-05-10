export function validate(cpf: string) {
    cpf = cpf.replace(/\D+/g, "");
    if(cpf.length < 11 || cpf.length > 14) return false;
    if(cpf.split("").every(c => c === cpf[0])) return false;
    
    let d1 = 0;
    let d2 = 0;
    let digito = 0;  
    for (let nCount = 1; nCount < cpf.length -1; nCount++) {
        digito = parseInt(cpf.substring(nCount -1, nCount));  							
        d1 = d1 + ( 11 - nCount ) * digito;
        d2 = d2 + ( 12 - nCount ) * digito;
    };
    let rest = 0;
    rest = (d1 % 11);  
    let dg1 = 0;
    dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;
    let dg2 = 0;
    d2 += 2 * dg1;  
    rest = (d2 % 11);  
    if (rest < 2) dg2 = 0;  
    else dg2 = 11 - rest;  
    let nDigVerific = cpf.substring(cpf.length-2, cpf.length);  
    let nDigResult;
    nDigResult = "" + dg1 + "" + dg2;
    return nDigVerific == nDigResult;
}