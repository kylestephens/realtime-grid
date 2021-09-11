export declare enum Operation {
    INSERT = "INSERT",
    DELETE = "DELETE"
}
export interface UpdateGridDto {
    readonly numberOfRows: number;
    readonly operation: Operation;
}
