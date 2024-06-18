import type { Language } from "../entities/room";
import { findRoomById } from "../repositories/room.repository";
import { getRandomInt } from "../utils";

export type PlayerRole =
  | { role: "Impostor"; playerName: string }
  | { role: "Regular"; playerName: string; word: string };

export function startGame(roomId: number): PlayerRole[] {
  const room = findRoomById(roomId);
  const impostorIndex = getRandomInt(0, room.players.length - 1);
  const word = getRandomWord(room.language);
  return room.players.map(({ name }, index) => {
    if (index === impostorIndex) {
      return {
        role: "Impostor",
        playerName: name,
      };
    }
    return {
      role: "Regular",
      playerName: name,
      word,
    };
  });
}

function getRandomWord(language: Language) {
  const words = require(`../../words/${language}.json`) as string[];
  return pickRandomElement(words);
}

function pickRandomElement<T>(array: T[]): T {
  return array[getRandomInt(0, array.length - 1)];
}
