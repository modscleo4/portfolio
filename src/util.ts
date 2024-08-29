import { Dev } from "./Dev";

export function formatPhone(phone: string): string {
    const { CountryCode, DDD, P1, P2 } = /(?<CountryCode>[\d]{2})(?<DDD>[\d]{2})9(?<P1>[\d]{4})(?<P2>[\d]{4})/gm.exec(phone)?.groups ?? {};
    return `+${CountryCode} (${DDD}) 9${P1}-${P2}`;
}

export function languageLevel(i: number): string {
    return ['Básico', 'Intermediário', 'Avançado', 'Fluente'][i];
}

export function techs(dev: Dev): string[] {
    return Object.values(dev.skills).reduce((acc: string[], s) => acc.concat(s.map(v => v.name)), []);
}

export function _(str: string): string {
    return str.replace(/ /g, '_');
}
