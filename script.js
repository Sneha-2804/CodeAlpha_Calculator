const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';

function updateDisplay() {
  display.textContent = currentInput || '0';
}

function evaluateExpression() {
  try {
    currentInput = eval(currentInput.replace(/×/g, '*').replace(/÷/g, '/')).toString();
  } catch (e) {
    currentInput = 'Error';
  }
  updateDisplay();
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.getAttribute('data-action');

    if (action === 'clear') {
      currentInput = '';
    } else if (action === '=') {
      evaluateExpression();
      return;
    } else if (action === 'back') {
      currentInput = currentInput.slice(0, -1);
    } else {
      currentInput += action;
    }

    updateDisplay();
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if ((/[\d+\-*/.]/.test(key))) {
    currentInput += key;
  } else if (key === 'Enter') {
    evaluateExpression();
    return;
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
  } else if (key === 'Escape') {
    currentInput = '';
  }

  updateDisplay();
});
