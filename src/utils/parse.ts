import { rejects } from 'assert';
import Papa from 'papaparse'

export const parseData = async (whitelistStrData: File | string) => {
    if (whitelistStrData instanceof File ) {
        console.log("Parsing File Data");
        const res = await CSVtoArray(whitelistStrData);
        return (res.flat())
        // try {
        //     const parseResult = await CSVtoArray(whitelistStrData);
        //     // return {
        //     //     success: true,
        //     //     result: parseResult
        //     // };
        //     return (parseResult)
        // } catch {
        //     console.log("Error parsing")
        //     // return {
        //     //     success: false,
        //     //     result: ['null']
        //     // };
            
        // }
    }
    
    else {
        console.log("Parsing textbox data" + whitelistStrData);
        return (await strDataToArray(whitelistStrData));
        // try {
        //     const parseResult = await strDataToArray(whitelistStrData);
        //     // return {
        //     //     success: true,
        //     //     result: parseResult
        //     // };
        // } catch {
        //     console.log("Error parsing")
        //     // return {
        //     //     success: false,
        //     //     result: ['null']
        //     // };
        // }
    }
}

export async function CSVtoArray( csv: File ): Promise<string[]> {
    return new Promise((resolve, reject) => {
    Papa.parse<string>(csv, {
        header: false,
        skipEmptyLines: true,
        chunk(result, parser) {
            // console.log(result)
            resolve(result.data);
            if (result.errors.length > 0) {
                parser.abort()
                console.log(result.errors)
                reject()
            }
        },
        complete() {
            console.log("complete");
        },
        error() {
            reject();
        }
    })}
    );
};

export async function strDataToArray( strData: string ): Promise<string[]> {
    const parseResults: string[] = [];

    return new Promise((resolve, reject) => {
        Papa.parse<string>(strData, {
            header: false,
            skipEmptyLines: true,
            step(result, parser) {
                parseResults.push(result.data);
                if (result.errors.length > 0) {
                    parser.abort()
                    console.log(result.errors)
                    reject()
                }
            },
            complete() {
                console.log("complete");
                resolve(parseResults);
            },
        })}
    );
};
