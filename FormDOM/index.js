//Logic

const labelInputField = document.querySelector('#labelvalue');
const form = document.querySelector('#form');
const inputtype = document.querySelector('#inputtype');
//console.log(labelInputField);

labelInputField.addEventListener('keyup',(event)=>{
    const keyPressed=event.key
    if(keyPressed==='Enter'){
        //create input
        const type=inputtype.value;
        const label=labelInputField.value;
        const labelInput=document.createElement("label");
        const div = document.createElement("div");
       //
        let input=null;
        if(type === 'textarea')
            input = document.createElement("textarea")
        else
            input = document.createElement("input")

        labelInput.innerHTML = label
        input.type = type
        //for style
        input.classList.add('form-control');
        labelInput.classList.add('form-label');
        div.classList.add('mb-3')

        if(type !='submit'){
        div.appendChild(labelInput);
        }
        if(type==='submit'){
            input.classList.add('btn')
            input.classList.add('btn-success')
            input.value=label;
        }
        div.appendChild(input);
        form.appendChild(div);

        console.log(type,label);
    }
})