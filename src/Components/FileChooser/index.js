import React, {useRef, useState} from "react";
import './fileChooser.scss';

const FileChooser = ({title, label, fileUploaded, onfileChange}) => {


    const inputRef = useRef();

    const onClick = () => {
        inputRef.current.click();
    }

    const onChange = (e) =>{
        if (e.target.files && e.target.files[0]) {

            var myFile = e.target.files[0];
            var reader = new FileReader();

            reader.addEventListener('load', function (e) {
                let csvdata = e.target.result;
                csvToJson(csvdata);
            });

            reader.readAsBinaryString(myFile);
        }
    }
    //var csv is the CSV file with headers
    const csvToJson = (csv) => {

        var lines=csv.split("\n");

        var result = [];

        // NOTE: If your columns contain commas in their values, you'll need
        // to deal with those before doing the next step
        // (you might convert them to &&& or something, then covert them back later)
        // jsfiddle showing the issue https://jsfiddle.net/
        var headers=lines[0].split(",");

        for(var i=1;i<lines.length;i++){

            var obj = {};
            var currentline=lines[i].split(",");

            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);

        }

        onfileChange(label,result)
    }

    return (
        <div data-testid={"input-1"} className={'file-chooser'}>
            <div className={'column'}>
                <h3>{title}</h3>
            </div>
            <div className={'column'}>
                <button disabled={fileUploaded} onClick={onClick}>{fileUploaded?'File Uploaded':'Choose CSV file'}</button>
                <input ref={inputRef} type={"file"} onChange={onChange} hidden accept={"text/csv"}/>
            </div>
        </div>
    )
}


export default FileChooser;
