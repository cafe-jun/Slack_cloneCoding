import { IDM, IChat } from '@typings/db'
import dayjs from 'dayjs'


export default function makeSection(chatList: (IDM | IChat)[]) {
    const sections: { [key: string]: (IDM | IChat)[] } = {};
    chatList.forEach((chat) => {
        const montDate = dayjs(chat.createdAt).format('YYYY-MM-DD');
        if (Array.isArray(sections[montDate])) {
            sections[montDate].push(chat)
        } else {
            sections[montDate] = [chat]
        }
    })
    return sections
}