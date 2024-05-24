const table = document.querySelector('.GSTTABLE');
const rows = table.querySelectorAll('tr.tabledetails');

rows.forEach(row => {
    let rowData = {};
    rowData.itemDescription = row.querySelector('textarea').value;
    rowData.qty = row.querySelectorAll('input[type="number"]')[0].value;
    rowData.rate = row.querySelectorAll('input[type="number"]')[1].value;
    rowData.sgst = row.querySelectorAll('input[type="number"]')[2].value;
    rowData.cgst = row.querySelectorAll('input[type="number"]')[3].value;
    rowData.cess = row.querySelectorAll('input[type="number"]')[4].value;
    row.querySelectorAll('input[type="number"]')[5].value = (Number(rowData.qty) * Number(rowData.rate));
    console.log(rowData);
});

const refresh = () => {
    const table = document.querySelector('.GSTTABLE');
    const rows = table.querySelectorAll('tr.tabledetails');

    rows.forEach(row => {
        let rowData = {};
        rowData.itemDescription = row.querySelector('textarea').value;
        rowData.qty = row.querySelectorAll('input[type="number"]')[0].value;
        rowData.rate = row.querySelectorAll('input[type="number"]')[1].value;

        rowData.cess = row.querySelectorAll('input[type="number"]')[4].value;

        rowData.amount = (Number(rowData.qty) * Number(rowData.rate)).toFixed(2);
        row.querySelectorAll('input[type="number"]')[5].value = rowData.amount;

        rowData.sgst = (row.querySelectorAll('input[type="number"]')[2].value / 100) * rowData.amount;
        row.getElementsByTagName('span')[0].innerHTML = parseFloat(rowData.sgst).toFixed(2);

        rowData.cgst = (row.querySelectorAll('input[type="number"]')[3].value / 100) * rowData.amount;
        row.getElementsByTagName('span')[1].innerHTML = parseFloat(rowData.cgst).toFixed(2);     
    });
}

document.querySelectorAll('.input-number, .AMOUNT').forEach((input) => {
    input.addEventListener('input', () => {
        refresh();
    });
});

document.getElementById('addButton').addEventListener('click', function() {
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
    function createInput(value, className, marginLeft = '10px', marginTop = '') {
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
    let input1 = createInput('2', 'input-number');
    td2.appendChild(input1);
    tr.appendChild(td2);

    // Create third td with input number
    let td3 = document.createElement('td');
    let input2 = createInput('2', 'input-number');
    td3.appendChild(input2);
    tr.appendChild(td3);

    // Create td with input number and span
    function createTdWithInputAndSpan() {
        let td = document.createElement('td');
        let input = createInput('2', 'input-number', '10px', '17px');
        td.appendChild(input);
        td.appendChild(document.createElement('br'));
        let span = document.createElement('span');
        span.setAttribute('class', 'sgst1');
        span.innerHTML = '12.00';
        td.appendChild(span);
        return td;
    }

    // Create fourth, fifth, and sixth td with input number and span
    tr.appendChild(createTdWithInputAndSpan());
    tr.appendChild(createTdWithInputAndSpan());
    tr.appendChild(createTdWithInputAndSpan());

    // Create seventh td with input number
    let td7 = document.createElement('td');
    let input6 = createInput('2', 'AMOUNT');
    td7.appendChild(input6);
    tr.appendChild(td7);

    table.appendChild(tr);
});