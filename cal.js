const input = document.querySelector('.input');
const buttons = document.querySelectorAll('.button');

let current = '';
let resetNext = false;

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.textContent.trim();

    if (value === 'C') {
      // Remove last character
      if (!resetNext) {
        current = current.slice(0, -1);
        input.value = current || '';
      }
    } else if (value === 'AC') {
      // Clear all
      current = '';
      input.value = '';
      resetNext = false;
    } else if (value === '=') {
      // Evaluate expression
      try {
        let expression = current.replace(/X/g, '*').replace(/%/g, '/100');
        let result = eval(expression);
        input.value = result;
        current = result.toString();
        resetNext = true;
      } catch {
        input.value = 'Error';
        current = '';
        resetNext = true;
      }
    } else {
      // Append value
      if (resetNext) {
        current = '';
        resetNext = false;
      }
      current += value;
      input.value = current;
    }
  });
});
