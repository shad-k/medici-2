import { rejects } from 'assert';
import Papa from 'papaparse'

export const parseData = async (whitelistStrData: File | string) => {
    if (whitelistStrData instanceof File ) {
        console.log("Parsing File Data");
        try {
            const parseResult = await CSVtoArray(whitelistStrData);
            return {
                success: true,
                result: parseResult
            };
        } catch {
            console.log("Error parsing")
            return {
                success: false,
                result: ['null']
            };
        }
    }
    
    else {
        console.log("Parsing textbox data" + whitelistStrData);
        try {
            const parseResult = await strDataToArray(whitelistStrData);
            return {
                success: true,
                result: parseResult
            };
        } catch {
            console.log("Error parsing")
            return {
                success: false,
                result: ['null']
            };
        }
    }
}

export async function CSVtoArray( csv: File ): Promise<string[]> {
    return new Promise((resolve, reject) => {
    Papa.parse<string>(csv, {
        header: false,
        chunk(result) {
            // console.log(result)
            resolve(result.data);
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
            step(result) {
                parseResults.push(result.data);
            },
            complete() {
                console.log("complete");
                resolve(parseResults);
            },
            error() {
                reject();
            }
        })}
    );
};
