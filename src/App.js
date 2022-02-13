import './App.scss';
import FileChooser from "./Components/FileChooser";
import {useEffect, useState} from "react";
import {merging} from "./Helpers/computing";
import {catalogA, catalogB, barcodesA, barcodesB, suppliersA, suppliersB, result} from "./inputs";
import {downloadCSV, removeWhiteSpaces} from "./Helpers/helper";

function App() {


    const [fileContents, setFileContents] = useState({
        catalogA, catalogB, barcodesA, barcodesB, suppliersA, suppliersB
    });

    const onfileChange = (label, csv_contents) => {
        setFileContents({
            ...fileContents,
            [label]: removeWhiteSpaces(csv_contents)
        })
    }


    const checkStateValidation = () => {
        return fileContents.hasOwnProperty("catalogA") &&
            fileContents.hasOwnProperty("catalogB") &&
            fileContents.hasOwnProperty("barcodesA") &&
            fileContents.hasOwnProperty("barcodesB") &&
            fileContents.hasOwnProperty("suppliersA") &&
            fileContents.hasOwnProperty("suppliersB")
    }
    return (
        <div className="App">

            <div className={'row'}>
                <FileChooser title={"Catalog A"} label={"catalogA"} onfileChange={onfileChange}
                             fileUploaded={fileContents.hasOwnProperty('catalogA')}/>
                <FileChooser title={"Barcodes A"} label={"barcodesA"} onfileChange={onfileChange}
                             fileUploaded={fileContents.hasOwnProperty('barcodesA')}/>
                <FileChooser title={"Suppliers A"} label={"suppliersA"} onfileChange={onfileChange}
                             fileUploaded={fileContents.hasOwnProperty('suppliersA')}/>
            </div>
            <div className={'row'}>
                <FileChooser title={"Catalog B"} label={"catalogB"} onfileChange={onfileChange}
                             fileUploaded={fileContents.hasOwnProperty('catalogB')}/>
                <FileChooser title={"Barcodes B"} label={"barcodesB"} onfileChange={onfileChange}
                             fileUploaded={fileContents.hasOwnProperty('barcodesB')}/>
                <FileChooser title={"Suppliers B"} label={"suppliersB"} onfileChange={onfileChange}
                             fileUploaded={fileContents.hasOwnProperty('suppliersB')}/>
            </div>

            <div className={'row'}>
                <button onClick={() => {
                    setFileContents({})
                }}>Clear
                </button>

                <button disabled={!checkStateValidation()} onClick={() => {
                    downloadCSV(merging(fileContents))
                }}>
                    Save as CSV
                </button>
            </div>

            <div className={"row"}>
                <table>
                    <tr>
                        <th>SKU</th>
                        <th>Description</th>
                        <th>Source</th>
                    </tr>
                    {
                        checkStateValidation() && merging(fileContents).map(c => {

                            return (
                                <tr key={c.SKU}>
                                    <td>{c.SKU}</td>
                                    <td>{c.Description}</td>
                                    <td>{c.Source}</td>
                                </tr>
                            )
                        })
                    }


                </table>
            </div>


        </div>
    );
}

export default App;
