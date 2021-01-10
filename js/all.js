let submitBtn = document.querySelector('.submitBtn');
let refreshBtn = document.querySelector('.refreshBtn');
let inputHeight = document.querySelector('#height');
let inputWeight = document.querySelector('#weight');
let alertText = document.querySelector('.alertText');
let listPanel = document.querySelector('.listPanel');
let clearAll = document.querySelector('.clearAll');
let statusList = [];
function refreshListPanel(e){
    let listPanel = document.querySelector('.listPanel');
    let str = '';
    statusList = JSON.parse(localStorage.getItem('statusList')) || [];
    for(let i = statusList.length-1; i >= 0; i--){
        str += 
        `
        <div class="listItem weight-${statusList[i].status}-border">
            <div class="listStatus">${statusList[i].statusText}</div>
            <div class="listBMI">
                <h5>BMI</h5>
                <p>${statusList[i].bmi}</p>
            </div>
            <div class="listWeight">
                <h5>weight</h5>
                <p>${statusList[i].weight}</p>
            </div>
            <div class="listHeight">
                <h5>height</h5>
                <p>${statusList[i].height}</p>
            </div>
            <div class="listDate">
                <h5>${statusList[i].date}</h5>
            </div>
            <div>
                <a href="#" class="listDelete"><img src="img/trash-can.svg" data-num = "${i}"></a>    
            </div>
        </div>
        `
    }
    listPanel.innerHTML = str;
}
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
//取得日期
function today(){
    var date = new Date();
    var time = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    return time;
}
function addList(e){
    e.preventDefault();
    let Height = inputHeight.value;
    let Weight = inputWeight.value;
    let BMI = Weight / Math.pow(Height/100, 2);
    BMI = parseFloat(BMI.toFixed(2));
    let Date = '06-19-2017';   /// 待改
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
    statusItem.date = today();
    statusList.push(statusItem);
    localStorage.setItem('statusList', JSON.stringify(statusList));
    //更新 listPanel
    refreshListPanel();
    //更新 statusPanel
    let status = document.querySelector('.status');
    document.querySelector('.status h3').textContent = statusItem.bmi;
    document.querySelector('.statusText').textContent = statusItem.statusText;
    submitBtn.style.display = 'none';
    status.style.display = 'flex';
    refreshBtn.setAttribute('class', "refreshBtn " + `weight-${statusItem.status}-bg`);
    status.setAttribute('class', "status " + `weight-${statusItem.status}-color`);
    // 更新刪除全部狀態
    refreshClearBtn();
}
function resetInput(e){
    e.preventDefault();
    let status = document.querySelector('.status');
    status.style.display = 'none';
    submitBtn.style.display = 'block';
    inputHeight.value = '';
    inputWeight.value = '';
}
function deleteListItem(e){
    //刪除有誤
    e.preventDefault();
    if(e.target.nodeName == 'IMG'){
        let dataNum = e.target.dataset.num;
        statusList.splice(dataNum, 1);
        localStorage.setItem('statusList', JSON.stringify(statusList));
        refreshListPanel();
        refreshClearBtn();
    }
}
function clearAllItem(e){
    e.preventDefault();
    localStorage.removeItem('statusList');
    refreshListPanel();
    this.style.display = 'none';
}
function refreshClearBtn(){
    let statusList = JSON.parse(localStorage.getItem('statusList')) || [];
    if(statusList.length != 0){
        clearAll.style.display = 'block';
    }else{
        clearAll.style.display = 'none';
    }
}
// 
refreshListPanel();
refreshClearBtn();
inputHeight.addEventListener('blur', heightCheck, false);
inputWeight.addEventListener('blur', weightCheck, false);
submitBtn.addEventListener('click', addList, false);
refreshBtn.addEventListener('click', resetInput, false);
listPanel.addEventListener('click', deleteListItem, false);
clearAll.addEventListener('click', clearAllItem, false);
