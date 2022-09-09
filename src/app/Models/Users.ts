export interface Login {
    UserName: string,
    Password: string
}
export interface AssignPhysician{
    MemberId: string,
    PhysicianId : number
}
export interface User {
    MemberId: string,
    FirstName: string
    LastName: string
    UserName: string
    DOB: Date
    Address: string
    State: string
    Email: string
    PhysicianId: number
    Password: string
    CreatedDate: Date
    ModifiedDate: Date
    UserType: number
}