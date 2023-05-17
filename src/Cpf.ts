export default class Cpf {
  private cpf: string;
  DIGIT_1_FACTOR = 10;
  DIGIT_2_FACTOR = 11;
  
  constructor(value: string) {
    if (!this.isCpf(value)) throw new Error('Invalid Cpf!');
    this.cpf = value;
  }

  isCpf(value: string) {
    if (!value) return false;
    value = this.removeNonDigits(value);
    if (!this.isValidLength(value)) return false;
		if (this.allDigitsTheSame(value)) return false;
    const digit1 = this.calculateDigit(value, this.DIGIT_1_FACTOR);
		const digit2 = this.calculateDigit(value, this.DIGIT_2_FACTOR);
		let checkDigit = this.extractCheckDigit(value);  
		const calculatedCheckDigit = `${digit1}${digit2}`;  
		return checkDigit == calculatedCheckDigit;
  }
    
  removeNonDigits (value: string) {
		return value.replace(/\D+/g, "");
	}

  isValidLength (value: string) {
		return value.length === 11;
	}
	
	allDigitsTheSame (value: string) {
		const [firstDigit] = value;
		return [...value].every(digit => digit === firstDigit);
	}

  calculateDigit (value: string, factor: number) {
		let total = 0;
		for (const digit of value) {
			if (factor > 1) {
				total += parseInt(digit) * factor--;
			}
		}
		const rest = total%11;
		return (rest < 2) ? 0 : 11 - rest;
	}
	
	extractCheckDigit (value: string) {
		return value.slice(-2);
	}

	getValue () {
		return this.cpf;
	}
}

// export function validate(cpf: string) {
//     cpf = cpf.replace(/\D+/g, "");
//     if(cpf.length < 11 || cpf.length > 14) return false;
//     if(cpf.split("").every(c => c === cpf[0])) return false;
    
//     let d1 = 0;
//     let d2 = 0;
//     let digito = 0;  
//     for (let nCount = 1; nCount < cpf.length -1; nCount++) {
//         digito = parseInt(cpf.substring(nCount -1, nCount));  							
//         d1 = d1 + ( 11 - nCount ) * digito;
//         d2 = d2 + ( 12 - nCount ) * digito;
//     };
//     let rest = 0;
//     rest = (d1 % 11);  
//     let dg1 = 0;
//     dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;
//     let dg2 = 0;
//     d2 += 2 * dg1;  
//     rest = (d2 % 11);  
//     if (rest < 2) dg2 = 0;  
//     else dg2 = 11 - rest;  
//     let nDigVerific = cpf.substring(cpf.length-2, cpf.length);  
//     let nDigResult;
//     nDigResult = "" + dg1 + "" + dg2;
//     return nDigVerific == nDigResult;
// }