import Papa from 'papaparse'

export const parseData = async (whitelistStrData: File | string) => {
    if (whitelistStrData instanceof File ) {
        console.log("Parsing File Data");
        return (await CSVtoArray(whitelistStrData));
    }
    
    else {
        console.log("Parsing textbox data" + whitelistStrData);
        return (await strDataToArray(whitelistStrData));
    }
}

export async function CSVtoArray( csv: File ): Promise<string[]> {
    return new Promise((resolve, reject) => {
    const parseResults: string[][] = [];
    Papa.parse<string>(csv, {
        header: false,
        skipEmptyLines: true,
        chunk(result, parser) {
            parseResults.push(result.data.flat());
        },
        complete() {
            console.log("complete")
            return resolve(parseResults.flat().filter((el) => {
                return el !== null && typeof el !== 'undefined' && el !== '';
            }));
        },
        error(error, csv) {
            console.log(error)
            return reject("Error parsing CSV file");
        }
    })}
    );
};

export async function strDataToArray( strData: string ): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const parseResults: string[] = [];
        
        Papa.parse<string>(strData, {
            header: false,
            skipEmptyLines: true,
            step(result, parser) {
                parseResults.push(result.data);
            },
            complete() {
                console.log("complete");
                return resolve(parseResults.flat().filter((el) => {
                    return el !== null && typeof el !== 'undefined' && el !== '';
                }));
            },
            error(error: Error) {
                console.log(error)
                return reject("Error parsing CSV string data");
            }
        })}
    );
};
