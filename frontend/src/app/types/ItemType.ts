//TODO: Change dateTime to correct type.
export type Item = {
    id: number;
    title: string
    name: string;
    location: string;
    dateTime: string;
    description: string;
    userUid?: string;
    itemType?: string;
    imageUrl?: string;
}