import Scene from '../../../scene';
import {
    ageFrame,
    descriptionFrame,
    genderFrame,
    geoFrame,
    nameFrame,
    photoFrame,
    saveFrame,
    searchGenderFrame,
    tagsFrame,
} from './frames';



export default function ProfileCreateScene(payload?) {
    return new Scene(payload)
    .add(nameFrame)
    .add(ageFrame)
    .add(geoFrame)
    .add(genderFrame)
    .add(searchGenderFrame)
    .add(descriptionFrame)
    .add(tagsFrame)
    .add(photoFrame)
    .add(saveFrame);
}