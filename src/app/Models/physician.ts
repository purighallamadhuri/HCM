export interface Physicians{
    PhysicianId : number,
    PhysicianName: string,
    PhysicianState : string,
    Status:number,
    CreatedBy:string,
    CreatedOn: Date
}

export interface AssignPhysician{
    MemberId:string,
    PhysicianId:number
}