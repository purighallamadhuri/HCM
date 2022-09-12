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

export interface Get_User {
    memberId: string,
    firstName: string
    lastName: string
    userName: string
    dob: Date
    address: string
    state: string
    email: string
    physicianId: number
    password: string
    createdDate: Date
    modifiedDate: Date
    userType: number
}
export interface SearchMembers{
    MemberId: string,
    FirstName:string,
    LastName:string,
    PhysicianId:number,
    ClaimId:string
}