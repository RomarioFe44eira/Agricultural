import { Person } from 'src/app/person/person.model';

export class Device {
    id: number;
    description: string;
    installationDate: string;
    token: string;
    situation: number;
    geometry: string;
    area: {
        id: number;
        description: string;
        geometry: string;
        createdAt: string;
    };
    person: Person;
}

