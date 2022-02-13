
# Getting Started with Bunnings Code Challenge


## About the app

This app written by React JS framework/
All you need to do is run "npm install" then "npm start"\
By run "npm run test" it will run one file in the components/fileChooser/index.test.js\
I have placed an example for test in Jest library


## Parameters Guide
**contents**: parameter should contain all CSVs contents in one object\
**full_contents**: parameter should contain all the CSVs after merge them\
**SKU, Source, SupplierID**: parameter passed from looping array


## Methods Created
`merging()`: This is the first function called by the component which accept array of all the CSVs contents.\

`combineBarcodes()`: This function to merge two barcodes into one array\

`findCatalog()`: Accepts three parameters - this function to finding the first row from catalog which match the SKU according to Source selected\

`findSuppliers()`: Accepts three parameters - this function to finding the first row from Supplier which match the SupplierID according to Source selected\

`removeDuplicates()`:Accepts  one parameter - this function accept parameter **full_contents** so it will map the array to remove the Barcodes duplicates then will loop again to remove SKU duplicates from the previous generated array\

`isSKUExist()`: Accepts two parameters - This function to check if the SKU exist in array \

`isBarcodeExist()`: Accepts two parameters - This function to check if the barcode exist in array \  

## Run App

App has 6 file inputs to insert the csv files also there are clear button in order to insert them again.\
The values already exist in the app but by click clear you can insert them again .\
The result will appear on page also you can click on "Save as CSV" to save it on your local machine.
