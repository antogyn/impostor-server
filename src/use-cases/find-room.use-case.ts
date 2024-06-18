import type { Room } from "../entities/room";
import { findRoomById } from "../repositories/room.repository";

export function findRoom(id: number): Room {
  return findRoomById(id);
}
