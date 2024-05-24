document.querySelectorAll('.input-number, .AMOUNT').forEach((input) => {
    input.addEventListener('input', () => {
        alert(input.value);
    });
});