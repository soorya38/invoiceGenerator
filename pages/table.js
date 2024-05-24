const table = document.querySelector('.GSTTABLE');
const rows = table.querySelectorAll('tr.tabledetails');

let sumValue = document.getElementById('subtotalvalue');
let sgstValue = document.getElementById('sgstvalue');
let cgstValue = document.getElementById('cgstvalue');
let total = document.getElementById('total');

rows.forEach(row => {
    let rowData = {};
    rowData.itemDescription = row.querySelector('textarea').value;
    rowData.qty = row.querySelectorAll('input[type="number"]')[0].value;
    rowData.rate = row.querySelectorAll('input[type="number"]')[1].value;
    rowData.sgst = row.querySelectorAll('input[type="number"]')[2].value;
    rowData.cgst = row.querySelectorAll('input[type="number"]')[3].value;
    rowData.cess = row.querySelectorAll('input[type="number"]')[4].value;
    row.querySelectorAll('input[type="number"]')[5].value = (Number(rowData.qty) * Number(rowData.rate));
    // console.log(rowData);
});

const refresh = () => {
    const table = document.querySelector('.GSTTABLE');
    const rows = table.querySelectorAll('tr.tabledetails');
    
    let totalAmount = 0;
    let totalSgst = 0;
    let totalCgst = 0;

    rows.forEach(row => {
        let rowData = {};
        rowData.itemDescription = row.querySelector('textarea').value;
        rowData.qty = row.querySelectorAll('input[type="number"]')[0].value;
        rowData.rate = row.querySelectorAll('input[type="number"]')[1].value;

        rowData.cess = row.querySelectorAll('input[type="number"]')[4].value;

        rowData.amount = (Number(rowData.qty) * Number(rowData.rate)).toFixed(2);
        row.querySelectorAll('input[type="number"]')[5].value = rowData.amount;
        
        // Calculate SGST and CGST for each row
        rowData.sgst = (row.querySelectorAll('input[type="number"]')[2].value / 100) * rowData.amount;
        rowData.cgst = (row.querySelectorAll('input[type="number"]')[3].value / 100) * rowData.amount;

        // Update SGST and CGST values in the row
        row.getElementsByTagName('span')[0].innerHTML = parseFloat(rowData.sgst).toFixed(2);
        row.getElementsByTagName('span')[1].innerHTML = parseFloat(rowData.cgst).toFixed(2);

        // Add to total amount, SGST, and CGST
        totalAmount += parseFloat(rowData.amount);
        totalSgst += parseFloat(rowData.sgst);
        totalCgst += parseFloat(rowData.cgst);
    });

    // Update total, SGST value, CGST value, and total amount outside the loop
    updateSumValue(totalAmount.toFixed(2));
    updateSgstValue(totalSgst.toFixed(2));
    updateCgstValue(totalCgst.toFixed(2));
    // Update total amount
    updateTotalValue((totalAmount + totalSgst + totalCgst).toFixed(2));
}


document.querySelectorAll('.input-number, .AMOUNT').forEach((input) => {
    input.addEventListener('input', () => {
        refresh();
    });
});

document.getElementById('addButton').addEventListener('click', function() {
    newRow();
});

const newRow = () => {
    let table = document.getElementById('table');

    let tr = document.createElement('tr');
    tr.setAttribute('class', 'tabledetails');

    // Create first td with textarea
    let td1 = document.createElement('td');
    let textArea = document.createElement('textarea');
    textArea.setAttribute('placeholder', 'Item Description');
    textArea.setAttribute('class', 'ID1');
    textArea.style.marginTop = '10px';
    textArea.value = "Enter Item Name";
    td1.appendChild(textArea);
    tr.appendChild(td1);

    // Helper function to create input elements
    function createInput(value, className, marginLeft = '12px', marginTop = '') {
        let input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('value', value);
        input.setAttribute('class', className);
        input.style.marginLeft = marginLeft;
        if (marginTop) input.style.marginTop = marginTop;
        input.addEventListener('input', () => {
            refresh();
        });
        return input;
    }

    // Create second td with input number
    let td2 = document.createElement('td');
    let input1 = createInput('0', 'input-number');
    td2.appendChild(input1);
    tr.appendChild(td2);

    // Create third td with input number
    let td3 = document.createElement('td');
    let input2 = createInput('0', 'input-number');
    td3.appendChild(input2);
    tr.appendChild(td3);

    // Create td with input number and span
    function createTdWithInputAndSpan() {
        let td = document.createElement('td');
        let input = createInput('0', 'input-number', '10px', '17px');
        td.appendChild(input);
        td.appendChild(document.createElement('br'));
        let span = document.createElement('span');
        span.setAttribute('class', 'sgst1');
        span.innerHTML = '0.00';
        td.appendChild(span);
        return td;
    }

    // Create fourth, fifth, and sixth td with input number and span
    tr.appendChild(createTdWithInputAndSpan());
    tr.appendChild(createTdWithInputAndSpan());
    tr.appendChild(createTdWithInputAndSpan());

    // Create seventh td with input number
    let td7 = document.createElement('td');
    let input6 = createInput('0', 'AMOUNT');
    td7.appendChild(input6);
    tr.appendChild(td7);

    let btn = document.createElement('button');
    btn.textContent = "Delete";
    btn.style.marginTop = "25px";
    btn.style.marginLeft = "0px";
    tr.append(btn);

    btn.onclick = () => {
        table.removeChild(tr);
    };

    table.appendChild(tr);
}

function updateSumValue(newValue) {
    sumValue.value = newValue;
}

function updateCgstValue(newValue) {
    cgstValue.value = newValue;
}

function updateSgstValue(newValue) {
    sgstValue.value = newValue;
}

function updateTotalValue(newValue) {
    total.value = newValue;
}

newRow();