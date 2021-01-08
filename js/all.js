let submitBtn = document.querySelector('.submitBtn');
let refreshBtn = document.querySelector('.refreshBtn');
let listDelete = document.querySelector('.listDelete');
let inputHeight = document.querySelector('#height');
let inputWeight = document.querySelector('#weight');
let alertText = document.querySelector('.alertText');
let statusList = JSON.parse(localStorage.getItem('statusList')) || [];

function refreshPageList(e){
    let calcList = document.querySelector('.calcList');
    let str = '';
    for(let i=0; i<statusList.length; i++){
        str += 
        `
        <div class="listItem">
            <div class="listStatus">理想</div>
            <div class="listBMI">
                <h5>BMI</h5>
                <p></p>
            </div>
            <div class="listWeight">
                <h5>weight</h5>
                <p></p>
            </div>
            <div class="listHeight">
                <h5>height</h5>
                <p></p>
            </div>
            <div class="listDate">
                <h5>sss</h5>
            </div>
            <a href="#" class="listDelete"><img src="img/trash-can.svg"></a>
        </div>
        `
    }
}
refreshPageList();

function heightCheck(e){
    let Height = inputHeight.value;
    let Weight = inputWeight.value;
    if(Height === "" || Height === " "){
        alertText.textContent = '您尚未填寫身高';
    }else if(0 > Height || Height > 200){
        alertText.textContent = '請填寫 0 - 200 以內的數字';
    }else if(isNaN(Height)){
        alertText.textContent = '身高請填寫數字';
    }else if(Weight === "" || Weight == " "){
        alertText.textContent = '您尚未填寫體重';   
    }else if(0 > Weight || Weight > 200){
        alertText.textContent = '請填寫 0 - 200 以內的數字';
    }else if(isNaN(Weight)){
        alertText.textContent = '體重請填寫數字';
    }else{
        alertText.textContent = '';
    }
}
function weightCheck(e){
    let Height = inputHeight.value;
    let Weight = inputWeight.value;
    if(Weight === "" || Weight === " "){
        alertText.textContent = '您尚未填寫體重';   
    }else if(0 > Weight || Weight > 200){
        alertText.textContent = '請填寫 0 - 200 以內的數字';
    }else if(isNaN(Weight)){
        alertText.textContent = '體重請填寫數字';
    }else if(Height === "" || Height === " "){
        alertText.textContent = '您尚未填寫身高';
    }else if(0 > Height || Height > 200){
        alertText.textContent = '請填寫 0 - 200 以內的數字';
    }else if(isNaN(Height)){
        alertText.textContent = '身高請填寫數字';
    }else{
        alertText.textContent = '';
    }
}
function addList(e){
    e.preventDefault();
    let Height = inputHeight.value;
    let Weight = inputWeight.value;
    let BMI = Weight / Math.pow(Height/100, 2);
    BMI = parseFloat(BMI.toFixed(2));
    let Date = 123;   /// 待改
    let statusItem = {};
    if(Height === "" || Height === " "){    
        alertText.textContent = '欄位有誤';
        return;
    }else if(0 > Height || Height > 200){
        alertText.textContent = '欄位有誤';
        return;
    }else if(Weight === "" || Weight === " "){    
        alertText.textContent = '欄位有誤';
        return;
    }else if(0 > Weight || Weight > 200){
        alertText.textContent = '欄位有誤';
        return;
    }else if(isNaN(Height) || isNaN(Weight)){
        alertText.textContent = '欄位有誤';
        return;
    }
    //判斷 並存入陣列
    if(18.5 <= BMI && BMI < 24){
        //理想
        statusItem.status = 'regular';
        statusItem.statusText = '理想';
    }else if(BMI < 18.5){
        //過輕
        statusItem.status = 'light';   
        statusItem.statusText = '體重過輕';
    }else if(24 <= BMI && BMI < 27){
        //過重
        statusItem.status = 'fat';
        statusItem.statusText = '體重過重';
    }else if(27 <= BMI && BMI < 30){
        //輕度肥胖
        statusItem.status = 'xl';
        statusItem.statusText = '輕度肥胖';
    }else if(30 <= BMI && BMI < 35){
        //中度肥胖
        statusItem.status = 'xxl';
        statusItem.statusText = '中度肥胖';
    }else{
        //重度肥胖
        statusItem.status = 'xxxl';
        statusItem.statusText = '重度肥胖';
    }
    statusItem.bmi = BMI;
    statusItem.weight = Weight;
    statusItem.height = Height;
    statusItem.date = Date;
    statusList.push(statusItem);
    // console.log(statusList);
    localStorage.setItem('statusList', JSON.stringify(statusList));
    //塞入 HTML
    let calcList = document.querySelector('.calcList');
    let str = '';
}

inputHeight.addEventListener('blur', heightCheck, false);
inputWeight.addEventListener('blur', weightCheck, false);
submitBtn.addEventListener('click', addList, false);

// submitBtn.addEventListener('click', )