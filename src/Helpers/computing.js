export const merging = (contents) => {
    const a = combineBarcodes(contents);

    const f = a.map((b) => {
        return {
            ...b,
            ...findCatalog(contents, b.SKU, b.Source),
            ...findSuppliers(contents, b.SupplierID, b.Source)
        }
    });

    const rd = removeDuplicates(f).sort((a,b)=>{

        if ( a.SKU < b.SKU ){
            return 1;
        }
        if ( a.SKU > b.SKU ){
            return -1;
        }
        return 0;
    });


    return rd.map(o=>{
        return {
            SKU:o.SKU,
            Description:o.Description,
            Source:o.Source
        }
    });
}

const combineBarcodes = (contents) => {
    const a = [];

    const aBars = contents.barcodesA.map(c => {
        return {
            ...c,
            Source: "A"
        }
    });
    const bBars = contents.barcodesB.map(c => {
        return {
            ...c,
            Source: "B"
        }
    });

    a.push(...aBars)
    a.push(...bBars)

    return a;
}

const findCatalog = (contents, SKU, Source) => {
    const aCat = contents.catalogA;
    const bCat = contents.catalogB;

    if (Source == "A") {
        return aCat.find((bb) => {
            return bb.SKU == SKU
        })
    } else {
        return bCat.find((bb) => {
            return bb.SKU == SKU
        })
    }
}

const findSuppliers = (contents, SupplierID, Source) => {

    const aSup = contents.suppliersA;
    const bSup = contents.suppliersB;

    if (Source == "A") {
        return {
            ...aSup.find((s) => {
                return s.ID == SupplierID
            })
        }
    } else {
        return bSup.find((s) => {
            return s.ID == SupplierID
        })
    }


}

const removeDuplicates = (full_contents) => {
    const a = [];
    const b = [];

    full_contents.map((row) => {
        if (!isBarcodeExist(a, row)) {
            a.push(row);
        }
    })

    a.map((row) => {
        if (!isSKUExist(b, row)) {
            b.push(row);
        }
    })
    return b;

}

const isSKUExist = (a, b) => {
    return a.filter((c) => {
        if(c.SKU == b.SKU){
            return true;
        }
        return false
    }).length > 0;
}

const isBarcodeExist = (a, b) => {
    return a.filter((c) => {
        if(c.Barcode == b.Barcode){
            return true;
        }
        return false
    }).length > 0;
}
