const urlinput = document.querySelector("input"),
btnclick = document.querySelector("button");

btnclick.addEventListener('click', e =>{
    e.preventDefault();                               // preventing form from submiting
    btnclick.innerText = "Downloading file...";
    fetchFile(urlinput.value);
});

function fetchFile(url){
    fetch(url).then(res => res.blob()).then(file =>{
        let tempUrl = URL.createObjectURL(file);
                                                      // fetchinbg file returning responce as blob()
        let atag = document.createElement("a");
        atag.href = tempUrl;                          //passing tempUrl as href value of <a> tag
                                                      //passing file last name & extension name as download value of <a> tag
        atag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(atag);              //adding tag inside the element
        atag.click();                                 //clicking <a> tag so the file download
        atag.remove();                                //removing <a> tag one file downloaded
        URL.revokeObjectURL(tempUrl);                 //removing temUrl from the object
        btnclick.innerText = "Download file";
    }).catch(()=>{
                                                      //catch method will call if any error comes during downloading
        btnclick.innerText = "Downloading file...";
        alert("failed to download file!");
    });
}