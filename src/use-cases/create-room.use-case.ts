import type { Language, Room } from "../entities/room";
import { createRoom as createRoomRepository } from "../repositories/room.repository";

export function createRoom(playerName: string, language: Language): Room {
  return createRoomRepository(playerName, language);
}
