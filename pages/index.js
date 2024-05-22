const printForm = () => {
    let header = document.getElementById('header');

    //company details
    let name = document.getElementById('name');
    let company = document.getElementById('company');
    let gst = document.getElementById('gst');
    let companyAdd = document.getElementById('companyAdd');
    let city = document.getElementById('city');
    let state = document.getElementById('state');
    let country = document.getElementById('country');

    //client details
    let nameCl = document.getElementById('nameCl');
    let companyCl = document.getElementById('companyCl');
    let gstCl = document.getElementById('gstCl');
    let companyAddCl = document.getElementById('companyAddCl');
    let cityCl = document.getElementById('cityCl');
    let stateCl = document.getElementById('stateCl');
    let countryCl = document.getElementById('countryCl');
    let placeOfSupply = document.getElementById('placeOfSupply');

    //invoice details
    let invoiceNo = document.getElementById('invoiceNo');
    let invoiceDate = document.getElementById('invoiceDate');
    let dueDate = document.getElementById('dueDate');

    let doc = new jsPDF();

    //comapany details
    let y = 24;
    doc.setFontStyle('bold');
    doc.setFontSize(10);
    doc.text(name.value, 18, y);
    doc.setFontSize(14);
    doc.setFontStyle('none');
    doc.text(company.value, 18, y+=6);
    doc.text(gst.value, 18, y+=6);
    doc.text(companyAdd.value, 18, y+=6);
    doc.text(city.value, 18, y+=6);
    doc.text(state.value, 18, y+=6);

    //header
    doc.setFontSize(28);
    doc.text(header.value, 140, 30);
    doc.setFontSize(14);

    y += 10
    //client company details
    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.text("Bill to: ", 18, y+=6);
    doc.setFontStyle('none');
    doc.setFontSize(14);
    doc.text(companyCl.value, 18, y+=6);
    doc.text(gstCl.value, 18, y+=6);
    doc.text(companyAddCl.value, 18, y+=6);
    doc.text(cityCl.value, 18, y+=6);
    doc.text(stateCl.value, 18, y+=6);

    doc.save("test.pdf");
}