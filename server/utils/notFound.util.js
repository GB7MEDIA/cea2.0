import { NOT_FOUND } from "./messages.util.js";

export const USER_NOT_FOUND = (res) => {
    return res.status(404).json({ error: NOT_FOUND.USER_NOT_FOUND });
};

export const MIETER_NOT_FOUND = (res) => {
    return res.status(404).json({ error: NOT_FOUND.MIETER_NOT_FOUND });
};

export const MIETER_USER_NOT_FOUND = (res) => {
    return res.status(404).json({ error: NOT_FOUND.MIETER_USER_NOT_FOUND });
};

export const OBJEKT_NOT_FOUND = (res) => {
    return res.status(404).json({ error: NOT_FOUND.OBJEKT_NOT_FOUND });
};

export const OBJEKT_ADRESSE_NOT_FOUND = (res) => {
    return res.status(404).json({ error: NOT_FOUND.OBJEKT_ADRESSE_NOT_FOUND });
};

export const SCHADEN_NOT_FOUND = (res) => {
    return res.status(404).json({ error: NOT_FOUND.SCHADEN_NOT_FOUND });
};

export const CHAT_NOT_FOUND = (res) => {
    return res.status(404).json({ error: NOT_FOUND.CHAT_NOT_FOUND });
};

export const CHAT_USER_NOT_FOUND = (res) => {
    return res.status(404).json({ error: NOT_FOUND.CHAT_USER_NOT_FOUND });
};

export const CHAT_MESSAGES_NOT_FOUND = (res) => {
    return res.status(404).json({ error: NOT_FOUND.CHAT_MESSAGES_NOT_FOUND });
};