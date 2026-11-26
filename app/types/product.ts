export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;

    description?:string
    year?:string | number
    memory?:string | number
    ram?:string | number 
    screen?:string
    processor?:string
    camera?:string
    frontCamera?:string
    battery?:string
    system?:string
    features?:string
    image?:string
    imageWidth?: number
    imageHeight?: number
    charging?: string | number
    os?: string | number
    connectivity?:string
    комплектация?:string
    specs?:Record<string,string>;
    type?: string
    construction?: string
    noiseCancellation?: string
    microphone?: string
    design?: string
    storage?: string | number
    display?: string | number
    printType?: string
    colorMode?: string
    printSpeed?: string
    resolution?: string | number
    paperFormat?: string | number
    ports?: number
    connectorType?: string
    fastCharge?: string
    cableLength?: string | number 
};  
