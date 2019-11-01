export module Network {
    export enum NetworkType {
		RESPONSE = 0,
		PUSH
    }
    export enum ResponseCode {
        FAIL = 0,
        SUCCESS = 1,
        CLOSE = 2
    }
    export enum HttpMethod {
        GET,
        POST
    }
    export module Socket {
        export interface Request {
            trCode: number;
            message?: any;
        }
        export interface Response extends Request {
            networkType?: Network.NetworkType;
            result: Network.ResponseCode;
        }
    }
    export module Http {
        export interface Request {
            url: string;
            type: Network.HttpMethod;
            message?: any;
        }
        export interface Response {
            result: Network.ResponseCode;
            message?: any;
        }
    }    
}


