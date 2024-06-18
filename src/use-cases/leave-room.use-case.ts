import type { Room } from "../entities/room";
import { removePlayer } from "../repositories/room.repository";

export function leaveRoom(roomId: number, playerName: string): Room {
  return removePlayer(roomId, playerName);
}
