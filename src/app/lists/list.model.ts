import { Course } from '../course.model';
import { Pair } from './pair.model';


export interface List {
    name: string;
    description: string;
    //creator: string;
    //timestamp: string;
    classes: Course[];
    isPersonal: boolean;

}