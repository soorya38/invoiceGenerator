async function printForm() {
    let header = document.getElementById('header');
    let name = document.getElementById('name');
    let company = document.getElementById('company');
    let gst = document.getElementById('gst');
    let companyAdd = document.getElementById('companyAdd');
    let city = document.getElementById('city');
    let state = document.getElementById('state');
    let country = document.getElementById('country');
    let nameCl = document.getElementById('nameCl');
    let companyCl = document.getElementById('companyCl');
    let gstCl = document.getElementById('gstCl');
    let companyAddCl = document.getElementById('companyAddCl');
    let cityCl = document.getElementById('cityCl');
    let stateCl = document.getElementById('stateCl');
    let countryCl = document.getElementById('countryCl');
    let placeOfSupply = document.getElementById('placeOfSupply');
    let invoiceNo = document.getElementById('invoiceNo');
    let invoiceDate = document.getElementById('invoiceDate');
    let dueDate = document.getElementById('dueDate');
    let doc = new jsPDF();
    let y = 24;
    
    // Add Company details
    doc.setFontStyle('bold');
    doc.setFontSize(10);
    doc.text(name.value, 18, y);
    doc.setFontSize(14);
    doc.setFontStyle('none');
    doc.text(company.value, 18, y += 6);
    doc.text(gst.value, 18, y += 6);
    doc.text(companyAdd.value, 18, y += 6);
    doc.text(city.value, 18, y += 6);
    doc.text(state.value, 18, y += 6);

    // Add Header
    doc.setFontSize(28);
    doc.text(header.value, 140, 30);
    doc.setFontSize(14);
    y += 10;

    // Add Client company details
    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.text("Bill to: ", 18, y += 6);
    doc.setFontStyle('none');
    doc.setFontSize(14);
    doc.text(nameCl.value, 18, y += 6);
    doc.text(companyCl.value, 18, y += 6);
    doc.text(gstCl.value, 18, y += 6);
    doc.text(companyAddCl.value, 18, y += 6);
    doc.text(cityCl.value, 18, y += 6);
    doc.text(stateCl.value, 18, y += 6);

    let table = document.getElementById('table');

    const tableHeader = document.getElementById('table').getElementsByTagName('tr')[0];
    const canvas = await html2canvas(tableHeader);
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 10, y+=2, 190, 0);
    let tableData = [];

    // let table = document.getElementById('table');
    // let doc = new jsPDF();
    // let y = 10; // Initial y position
    y += 7;
    for (let i = 0; i < table.rows.length; i++) {
        let x = 10; // Initial x position for each row
        let row = table.rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j];
            let input = cell.querySelector('input[type="text"], textarea, input[type="number"]');
            let cellValue = input ? input.value : '';
            if(j == 0)
                doc.text(cellValue, x + (j+1) * 10, y); // Position text based on column index
            else    
                doc.text(cellValue, 25 + (j+1) * 23, y);
        }
        y += 6; // Move to the next line after each row
    }


    console.log(tableData);

    doc.save();
}