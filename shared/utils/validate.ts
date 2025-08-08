export function validateCpf(cpf: string) {
	cpf = cpf.replace(/[^\d]/g, '');

	if (/^(\d)\1{10}$/.test(cpf)) return false;

	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += parseInt(cpf.charAt(i)) * (10 - i);
	}
	let digit = 11 - (sum % 11);
	if (digit > 9) digit = 0;
	if (digit !== parseInt(cpf.charAt(9))) return false;

	sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += parseInt(cpf.charAt(i)) * (11 - i);
	}
	digit = 11 - (sum % 11);
	if (digit > 9) digit = 0;
	if (digit !== parseInt(cpf.charAt(10))) return false;

	return true;
}

const formatBirthDate = (text: string | undefined): string => {
  if (!text) return '';
  
  // Remove tudo que não for dígito e limita a 8 caracteres (dd/mm/yyyy)
  const cleaned = text.replace(/\D/g, '').substring(0, 8);

  // Aplica a máscara incrementalmente
  if (cleaned.length > 4) {
    return cleaned.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3');
  }
  if (cleaned.length > 2) {
    return cleaned.replace(/^(\d{2})(\d{2}).*/, '$1/$2');
  }

  return cleaned;
};

// Função de validação
export const validateBirthDate = (dateString: string | undefined): boolean | string => {
  if (!dateString) return 'Campo obrigatório';

  const [day, month, year] = dateString.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  
  // Valida a data
  if (birthDate.getFullYear() !== year || birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day) {
    return 'Data inválida. Use o formato DD/MM/YYYY.';
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  
  if (age < 18) {
    return 'Você deve ter pelo menos 18 anos.';
  }

  return true;
};