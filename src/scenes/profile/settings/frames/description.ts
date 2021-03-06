import { Keyboard } from 'vk-io';

import { bot, users } from '../../../..';
import User from '../../../../controllers/user.controller';
import Frame from '../../../../models/frame';
import descriptionValidator from '../../../../validators/profile/description';
import ProfileMainScene from '../../main';
import { Response } from './../../../../typings/global';


export default new Frame(
    async (scene, options) => {
        bot.sendMessage({
            message: options?.phrase || 'Расскажи о себе и своих интересах. Хорошее описание поможет найти подходящих тебе людей.',
            peer_id: scene.user.id,
            ...scene.payload?.description && { keyboard: Keyboard.builder().textButton({
                label: 'Оставить текущее',
                payload: {
                   leaveCurrent: true 
                },
                color: Keyboard.SECONDARY_COLOR
            }).oneTime() }
        });
    },
    (message, scene) => {
        let description = message.text;
        let leaveCurrent = message.messagePayload;
        let response = descriptionValidator(description);
        let profileController = new User(scene.user.id).profile;
        if (response === Response.NO_VALUE) {
            scene.retry({
                phrase: 'Пожалуйста, расскажи о себе.'
            });
        } else if (response === Response.OUT_OF_RANGE) {
            scene.retry({
                phrase: 'Длина описание не должна быть меньше трёх и больше 512 символов в длину.'
            });
        } else if (response === Response.VALID) {
            profileController.edit({ description: description, last_edit: new Date().getTime() });
        }
        if (leaveCurrent || response === Response.VALID) {
            users.get(scene.user.id.toString()).setScene(ProfileMainScene());
        }
    }
);