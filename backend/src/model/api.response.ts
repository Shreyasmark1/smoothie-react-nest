
export class ApiResponse {

    status:number; // 1 = success, 0 = failed
    message:string;
    data:any;

    static STATUS_SUCESS = 1;
    static STATUS_FAILED = 0;

    private constructor(status:number, message:string, data:any){
        this.status = status,
        this.message = message,
        this.data = data
    }

    static failed = (message: string, data:any = null) => {
        return new ApiResponse(this.STATUS_FAILED, message, data)
    }

    static success = (message: string, data:any = null) => {
        return new ApiResponse(this.STATUS_SUCESS, message, data)
    }

    static send = (data:any, message: string = "" ) => {
        return new ApiResponse(this.STATUS_SUCESS, message,data)
    }

}