function validatePassword(senha: string): boolean {
    if (senha.length !== 6) {
      return false;
    }
  
    const senhaNum: number = parseInt(senha, 10);
    if (senhaNum < 184759 || senhaNum > 856920) {
      return false;
    }
  
    let hasAdjacentDigits: boolean = false;
    let isIncreasing: boolean = true;
  
    for (let i = 0; i < senha.length - 1; i++) {
      if (senha[i] === senha[i + 1]) {
        hasAdjacentDigits = true;
      }
      if (senha[i] > senha[i + 1]) {
        isIncreasing = false;
        break;
      }
    }
  
    return hasAdjacentDigits && isIncreasing;
  }
  
  export default validatePassword;