import type { Room } from "../entities/room";
import { addPlayer } from "../repositories/room.repository";

export function joinRoom(roomId: number, playerName: string): Room {
  return addPlayer(roomId, playerName);
}
