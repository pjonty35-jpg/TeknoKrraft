import type { Session } from "./data";

function escapeText(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function utcStamp(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function foldLine(line: string) {
  const encoder = new TextEncoder();
  let output = "";
  let bytes = 0;
  for (const character of line) {
    const length = encoder.encode(character).length;
    if (bytes + length > 75) {
      output += "\r\n ";
      bytes = 1;
    }
    output += character;
    bytes += length;
  }
  return output;
}

export function createCalendar(selected: Session[], now = new Date()) {
  const sessionTime = (session: Session, time: string) =>
    utcStamp(new Date(`2026-10-${15 + session.day}T${time}:00+05:30`));
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tekno Krraft//Event Plan//EN",
    "CALSCALE:GREGORIAN",
    ...selected.flatMap((session) => [
      "BEGIN:VEVENT",
      `UID:${session.id}@tekno-krraft-2026`,
      `DTSTAMP:${utcStamp(now)}`,
      `DTSTART:${sessionTime(session, session.start)}`,
      `DTEND:${sessionTime(session, session.end)}`,
      `SUMMARY:${escapeText(session.title)}`,
      `LOCATION:${escapeText(session.venue + ", ITER Campus, Bhubaneswar")}`,
      `DESCRIPTION:${escapeText(session.description)}`,
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
  ];
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
