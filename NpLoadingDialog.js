export function NpLoadingDialog(msg,backgroundColor,textColor,duration,requestMethod,requestBody,requestHeaders){
    if(typeof(duration)==='string')
        return NpLoadingDialogLink(msg,backgroundColor,textColor,duration,requestMethod,requestBody,requestHeaders);
    
    const backNode = document.createElement('section');
    const dialogNode = document.createElement('article');
    const msgNode = document.createElement('div');
    const loadingIcon = document.createElement('div');
    
    msgNode.innerText = msg?msg:'Loading...';
    
    backNode.setAttributeNode(document.createAttribute("data-np-dialog"));
    backNode.style.background = '#00000040';
    backNode.style.position = 'fixed';
    backNode.style.display = 'flex';
    backNode.style.right = '0';
    backNode.style.top = '0';
    backNode.style.zIndex = '200';
    backNode.style.justifyContent = 'center';
    backNode.style.alignItems = 'center';
    backNode.style.height = '-webkit-fill-available';
    backNode.style.width = '-webkit-fill-available';

    dialogNode.style.position = 'relative';
    dialogNode.style.background = backgroundColor?backgroundColor:'white';
    dialogNode.style.borderRadius = '10px';
    dialogNode.style.width = 'min(400px, calc(100% - 100px))';
    dialogNode.style.overflowY = 'overlay';
    dialogNode.style.overflowWrap = 'break-word';
    dialogNode.style.padding = '40px 20px';

    loadingIcon.style.position = 'absolute';
    loadingIcon.style.display = 'flex';
    loadingIcon.style.flexDirection = 'column';
    loadingIcon.style.justifyContent = 'center';
    loadingIcon.style.right = '5px';
    loadingIcon.style.top = '5px';
    loadingIcon.style.width = '20px';
    loadingIcon.style.height = '20px';
    loadingIcon.style.borderRadius = '50%';
    loadingIcon.style.border = 'grey 2px solid';
    loadingIcon.style.borderTop = 'none';
    loadingIcon.style.borderRight = 'none';
    let rotateCounter=0;
    setInterval(()=>{loadingIcon.style.transform = `rotate(${++rotateCounter}deg)`});

    msgNode.style.width = '-webkit-fill-available';
    msgNode.style.marginInline = '10px';
    msgNode.style.color = textColor?textColor:'black';
    msgNode.style.fontSize = '13px';
    msgNode.style.fontFamily = 'Cairo , sans-serif';
    msgNode.style.textAlign = 'center';

    dialogNode.appendChild(loadingIcon)
    dialogNode.appendChild(msgNode)
    backNode.appendChild(dialogNode)
    document.body.appendChild(backNode);
    if(duration)
        setTimeout(()=>{document.body.removeChild(backNode)},duration)
    else{
        const cancel_btn = document.createElement('label');
        cancel_btn.innerText = 'Cancel';
        cancel_btn.style.position = 'absolute';
        cancel_btn.style.right = '5px';
        cancel_btn.style.bottom = '5px';
        cancel_btn.style.background = 'brown';
        cancel_btn.style.color = 'white';
        cancel_btn.style.textAlign = 'center';
        cancel_btn.style.fontFamily = 'Cairo , sans-serif';
        cancel_btn.style.fontSize = '12px';
        cancel_btn.style.padding = '5px 10px';
        cancel_btn.style.borderRadius = '5px';

        cancel_btn.onclick = ()=> document.body.removeChild(backNode);
        dialogNode.appendChild(cancel_btn);
    }
}

function NpLoadingDialogLink(msg,backgroundColor,textColor,link,requestMethod,requestBody,requestHeaders){
    const backNode = document.createElement('section');
    const dialogNode = document.createElement('article');
    const msgNode = document.createElement('div');
    const loadingIcon = document.createElement('div');

    msgNode.innerText = msg?msg:'Loading...';

    backNode.style.background = '#00000040';
    backNode.style.position = 'fixed';
    backNode.style.display = 'flex';
    backNode.style.right = '0';
    backNode.style.top = '0';
    backNode.style.zIndex = '200';
    backNode.style.justifyContent = 'center';
    backNode.style.alignItems = 'center';
    backNode.style.height = '-webkit-fill-available';
    backNode.style.width = '-webkit-fill-available';

    dialogNode.style.position = 'relative';
    dialogNode.style.background = backgroundColor?backgroundColor:'white';
    dialogNode.style.borderRadius = '10px';
    dialogNode.style.width = 'min(400px, calc(100% - 100px))';
    dialogNode.style.overflowY = 'overlay';
    dialogNode.style.overflowWrap = 'break-word';
    dialogNode.style.padding = '40px 20px';

    loadingIcon.style.position = 'absolute';
    loadingIcon.style.display = 'flex';
    loadingIcon.style.flexDirection = 'column';
    loadingIcon.style.justifyContent = 'center';
    loadingIcon.style.right = '5px';
    loadingIcon.style.top = '5px';
    loadingIcon.style.width = '20px';
    loadingIcon.style.height = '20px';
    loadingIcon.style.borderRadius = '50%';
    loadingIcon.style.border = 'grey 2px solid';
    loadingIcon.style.borderTop = 'none';
    loadingIcon.style.borderRight = 'none';
    let rotateCounter=0;
    setInterval(()=>{loadingIcon.style.transform = `rotate(${++rotateCounter}deg)`});

    msgNode.style.width = '-webkit-fill-available';
    msgNode.style.marginInline = '10px';
    msgNode.style.color = textColor?textColor:'black';
    msgNode.style.fontSize = '13px';
    msgNode.style.fontFamily = 'Cairo , sans-serif';
    msgNode.style.textAlign = 'center';

    dialogNode.appendChild(loadingIcon)
    dialogNode.appendChild(msgNode)
    backNode.appendChild(dialogNode)
    document.body.appendChild(backNode);
    return new Promise((resolve,reject)=>{
    setTimeout(() => {
        let options={};
        if(requestMethod){
            options['method'] = requestMethod;
            if(requestMethod.toUpperCase()==='POST' || requestMethod.toUpperCase()==='PUT'){
                options['headers'] = requestHeaders?requestHeaders:{'Content-Type': 'application/json'};
                options['body'] = requestBody?JSON.stringify(requestBody):'{}';
            }
        }else{
            options['method'] = 'GET';
        }
            
            fetch(link, options).then(respone=>{
                document.body.removeChild(backNode);
                resolve(respone);
            }).catch(e=>{
                document.body.removeChild(backNode);
                resolve(e)
            })
            
        }, 2000);
    })
}

export function NpDestroyDialog(){
    let dialogsArray = document.querySelectorAll("[data-np-dialog]");
    if(!dialogsArray.length)
        return;
    dialogsArray.forEach((dialog)=>{
        document.body.removeChild(dialog);
    })
}
