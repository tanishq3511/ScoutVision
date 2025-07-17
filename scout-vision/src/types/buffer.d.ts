declare module 'buffer' {
    export class Buffer {
        constructor(input: any, encodingOrOffset?: any, length?: any);
        static from(input: any, encodingOrOffset?: any, length?: any): Buffer;
        static alloc(size: number, fill?: any, encoding?: any): Buffer;
    }
} 