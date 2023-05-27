let payload = {};

function setFormPayload() {
    let payloadData = localStorage.getItem("formRequestPayload");
    if (payloadData) {
        payload = JSON.parse(payloadData);
    }
    console.log(payload);
    let pageForms = document.querySelectorAll("form");
    pageForms.forEach((elem, index) => {
        section = elem.className;
        if (section) {
            let sectionData = payload[section];
            if (sectionData) {
                if (elem.id in sectionData) {
                    formData = sectionData[elem.id]
                    fillFormValues(formData, elem.id);
                }
            }
        }
    });
}

async function getFormPayload(){
    let pageForms = document.querySelectorAll("form");
    pageForms.forEach((elem, index) => {
        section = elem.className;
        if (section) {
            registerPayloadSection(section);
            //console.log(`Section for ${elem.id}`)
            registerFormValues(section, elem.id);
        }
    });
    return payload;
}
function save(data) {
    let el = JSON.stringify(data);
    console.log(el);
    localStorage.setItem("formRequestPayload", el);
}

function finalSubmit(data) {
    let el = JSON.stringify(data);
    console.log(el);
    localStorage.setItem("formRequestPayload", el);
}

function registerPayloadSection(section) {
    if (section in payload)
        return;
    payload[section] = {};
}

function registerFormValues(section, form_id) {
    let inputValues = document.querySelectorAll(`#${form_id} input`);
    let selectValues = document.querySelectorAll(`#${form_id} select`);
    payload[section][form_id] = {}
    inputValues.forEach((elem, index) => {
        let key = elem.name.trim();
        let value = elem.value.trim();
        payload[section][form_id][key] = value;
    })
    selectValues.forEach((elem, index) => {
        let key = elem.name.trim();
        let value = elem.value.trim();
        payload[section][form_id][key] = value;
    })
}
function fillFormValues(formData, form_id) {
    let inputValues = document.querySelectorAll(`#${form_id} input`);
    let selectValues = document.querySelectorAll(`#${form_id} select`);
    payload[section][form_id] = {}
    inputValues.forEach((elem, index) => {
        let key = elem.name.trim();
        if (key in formData)
            elem.value = formData[key];
    })
    selectValues.forEach((elem, index) => {
        let key = elem.name.trim();
        if (key in formData)
            elem.value = formData[key];
    })
}