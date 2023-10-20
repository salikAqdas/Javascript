function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
let paramCount = 1;
function showRequestHeader(){
    document.getElementById("request-header").style.display = "block";
    document.getElementById("request-body").style.display = "none";
    document.getElementById("request-header-label").className = "request-body-tabs active-tab";
    document.getElementById("request-body-label").className = "request-body-tabs";
}
function showRequestBody(){
    document.getElementById("request-body").style.display = "block";
    document.getElementById("request-header").style.display = "none";
    document.getElementById("request-body-label").className = "request-body-tabs active-tab";
    document.getElementById("request-header-label").className = "request-body-tabs";
}

function showProgressBar(){
    document.getElementById("progress-container").style.display = "block";
}
function hideProgressBar(){
    document.getElementById("progress-container").style.display = "none"; 
}

function changeTextColor(e) {
    switch (e.value) {
        case "get":
            e.style.color = "green";
            document.getElementById("request-body-label").style.display = "none";
            showRequestHeader();
            break;

            case "post":
            case "put":
            e.style.color = "#b59601";
            break;

            case "del":
            e.style.color = "red"; 
            break;
            
        default:
            break;
    }
    if(e.value != "get"){
        document.getElementById("request-body-label").style.display = "initial";
    }
}


{
    let jsonLabel = document.getElementById("paramJson-radio-label");
    let customParamlabel = document.getElementById("customparam-radio-label");
    let jsonParamDiv = document.getElementById("json-param-div");
    let custParamDiv = document.getElementById("custom-param-div");

    jsonLabel.addEventListener('click' ,()=>{
        custParamDiv.style.display = "none";
        jsonParamDiv.style.display = "initial";
    })
    customParamlabel.addEventListener('click' ,()=>{
        custParamDiv.style.display = "block";
        jsonParamDiv.style.display = "none";
    })
}
{
    let addBtn = document.getElementById("addCustomParam-btn");
    let paramContainer = document.getElementById("custom-param-div");
    addBtn.addEventListener('click' , ()=>{
        let str = `<div class="custom-parameter-container">
                        <input type="text" name="" id="custom-param-key-${paramCount+1}" placeholder="Enter key here">
                        <input type="text" name="" id="custom-param-value-${paramCount+1}" placeholder="Enter value here">
                        <button id="delCustomParam-btn" class = "delCustomParam-btn">-</button>
                    </div>`
        paramContainer.appendChild(getElementFromString(str));
        paramCount++;
        let deleteParam = document.getElementsByClassName("delCustomParam-btn");
        for(item of deleteParam){
            item.addEventListener('click' , (e)=>{
                e.target.parentElement.remove();
            })
        }
    })
}

//#####################################  HTTP Request  ###################################

function sendReq(){
    showProgressBar();
    document.getElementById("response-textarea").value = "Please wait..."
    const apiUrl = document.getElementById("req-url").value;
    const requestType = document.getElementById("requestType").value;
    if(requestType == "GET"){
        let x = getHeaderData();
        if(x.trim() == ''){
            
            callGet(apiUrl);
        }
        else{
            callGet(apiUrl , getHeaderData());
        }
    }
    else{
            callRest(apiUrl ,requestType, getHeaderData() , getBody());
    }
    hideProgressBar();
}
function callGet(apiUrl , header){
    if(header == undefined){
        header = {}
    }
    else{
        header = JSON.parse(header);
    }
    fetch(apiUrl,{
        method:'GET',
        headers: header
    })
    .then(response => response.text())
    .then((text)=>{
        document.getElementById("response-textarea").value = text;
    })
}
    function callRest(apiUrl , requestType ,  header , Body){
        Body = JSON.stringify(JSON.parse(Body));
        if(header == undefined){
            header = {}
        }
        else{
            header = JSON.parse(header);
        }
        // header['Content-Type'] = 'application/json';
        fetch(apiUrl,{
            method: requestType,
            headers: header,
            body: Body,
        })
        .then(response => response.text())
        .then((text)=>{
            document.getElementById("response-textarea").value = text;
        })
    }
function getHeaderData(){
    let paramType = document.querySelector("input[name = 'param-radio']:checked").value;
    let data;
    if(paramType == "json"){
        data = document.getElementById("json-param").value;
    }
    else{
        data = {};
        for(i =1; i<paramCount+1;i++){
            let key = document.getElementById(`custom-param-key-${i}`);
            if(key != undefined){
                key = key.value;
                let value = document.getElementById(`custom-param-value-${i}`).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    } 
    return data;
}

function getBody(){
    let reqBody = document.getElementById("request-body-textarea").value;
    return reqBody;
}

// ############################## BEAUTIFY #############################

let beautify = document.getElementById("beautify");
let tar = document.getElementById("response-textarea");
beautify.addEventListener('click' , ()=>{
    let JsonString = tar.value;
    const formattedJson = JSON.stringify(JSON.parse(JsonString),null,4);
    tar.value = formattedJson;
})  
