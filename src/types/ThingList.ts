export default interface IThingData {
    id: string,
    thingId?: any | null,
    name: string,
    description: string,
    location: string,
    category: number
    quantity?: number,
    dateEnd?: string,
    user: any,
    check_thing: boolean
}