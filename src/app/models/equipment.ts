import { Clinic } from "./clinic";

export class Equipment {
    id: number;
    equipmentName: string;
    suppliedAt: Date;
    quantity: number;
    unitPrice: number;
    condition: number;
    
    clinic: Clinic = new Clinic();
}
