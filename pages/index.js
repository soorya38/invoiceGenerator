async function printForm() {
    let sum = 0;
    let sumCgst = 0;
    let sumSgst = 0;

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
    
    //add.text("text(string)", x, y)

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
    doc.text(countryCl.value,18,y+=6);

    // Add Header
    doc.setFontSize(28);
    doc.text(header.value, 140, 30);
    doc.setFontSize(14);
    y += 10;
    doc.text(invoiceNo.value,180,y-27)
    // Add Client company details
    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.text("Bill to: ", 18, y += 6);
    doc.setFontStyle('none');
    doc.setFontSize(10);
    doc.text(nameCl.value, 18, y += 6);
    doc.text(companyCl.value, 18, y += 6);
    doc.text(gstCl.value, 18, y += 6);
    doc.text(companyAddCl.value, 18, y += 6);
    doc.text(cityCl.value, 18, y += 6);
    doc.text(stateCl.value, 18, y += 6);
    doc.text(countryCl.value,18,y+=6);
    doc.text("Place of supply : " + placeOfSupply.value, 18, y += 6);
    doc.text("Invoice Date: "+invoiceDate.value,150,y-40)
    doc.text("Due Date:"+dueDate.value,150,y-34);

    // doc.text(countryCl.value, 18, y += 6);

    let table = document.getElementById('table');

    //fetching table data
    const tableHeader = document.getElementById('table').getElementsByTagName('tr')[0];
    const canvas = await html2canvas(tableHeader);
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 10, y+=2, 190, 0);
    let tableData = [];

    y += 7;

    //printing table data
    for (let i = 0; i < table.rows.length; i++) {
        let x = 0;
        let row = table.rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j];
            let input = cell.querySelector('input[type="text"], textarea, input[type="number"]');
            let cellValue = input ? input.value : '';
            
            if (j == 0) {
                doc.text(cellValue, x + (j + 1) * 10, y);
            } else {
                if(j == 6) {
                    doc.text(cellValue, x+10 + (j + 1) * 23, y);
                    sum += Number(cellValue);
                    
                }
                else if(j == 5)
                    doc.text(cellValue, x+10 + (j + 1) * 23, y);
                else if(j == 4) {
                    doc.text(cellValue, x+15 + (j + 1) * 23, y);
                    sumCgst += Number(cellValue);
                }
                else if(j == 3) {
                    doc.text(cellValue, x+18 + (j + 1) * 23, y);
                    sumSgst += Number(cellValue);
                }
                else if(j == 2)
                    doc.text(cellValue, x+23 + (j + 1) * 23, y);
                else
                    doc.text(cellValue, x+27 + (j + 1) * 23, y);

                if (j == 3) {
                    let spanElement = cell.querySelector('.sgst1');
                    if (spanElement) {
                        let spanValue = spanElement.innerHTML;
                        doc.text(spanValue, x+17 + (j + 1) * 23, y + 6);
                    }
                } else if(j == 4) {
                    let spanElement = cell.querySelector('.sgst1');
                    if (spanElement) {
                        let spanValue = spanElement.innerHTML;
                        doc.text(spanValue, x+15 + (j + 1) * 23, y + 6);
                    }
                } else if(j == 5) {
                    let spanElement = cell.querySelector('.sgst1');
                    if (spanElement) {
                        let spanValue = spanElement.innerHTML;
                        doc.text(spanValue, x+10 + (j + 1) * 23, y + 6);
                    }
                }
            }
        }

        if(i != 0)
            y += 14;
        else    
            y += 12;
        
        if (y > 297 - 10) { 
            doc.addPage();
            y = 10;
            doc.addImage(imgData, 'PNG', 10, y+=2, 190, 0);
            y += 17;
        }
    }

    doc.setFontSize(14);
    function addText(text, x, incrementY) {
        if (incrementY) {
            if (y + incrementY > doc.internal.pageSize.height - 20) {
                doc.addPage();
                y = 20;
            } else {
                y += incrementY;
            }
        }
        doc.text(text, x, y);
    }
    
    let sumValue = document.getElementById('sumValue');
    addText(sumValue.value !== '' ? sumValue.value + ": " : "Sub total: ", 150, 30);
    doc.text(String(sum), 180, y);
    
    addText("CGST: ", 150, 10);
    doc.text(String(sumCgst), 180, y);
    
    addText("SGST: ", 150, 10);
    doc.text(String(sumSgst), 180, y);
    
    addText("Total: ", 150, 10);
    doc.text(String(sumSgst + sumCgst + sum), 180, y);

    doc.save();
}