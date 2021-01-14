import { Equipment } from "./equipment";

export class Clinic {
    id: number;
    clinicName: string;
    equipmentCount: number;
    
    equipments: Array<Equipment> = [];
}
