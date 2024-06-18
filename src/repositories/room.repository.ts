import type { Language, Room } from "../entities/room";
import { getRandomInt } from "../utils";

const rooms: Room[] = [];

export function findRoomById(roomId: number): Room {
  const room = rooms.find(({ id }) => id === roomId);
  if (!room) {
    throw new Error("Room not found!");
  }
  return room;
}

export function createRoom(playerName: string, language: Language): Room {
  let id = getRandomInt(1, 999999);
  while (rooms.find(({ id: roomId }) => id === roomId)) {
    id = getRandomInt(1, 999999);
  }
  const room: Room = {
    id,
    language,
    players: [
      {
        name: playerName,
      },
    ],
  };
  rooms.push(room);
  return room;
}

export function addPlayer(roomId: number, playerName: string): Room {
  const room = findRoomById(roomId);
  room.players.push({ name: playerName });
  return room;
}

export function removePlayer(roomId: number, playerName: string): Room {
  const room = findRoomById(roomId);
  room.players = room.players.filter(({ name }) => name !== playerName);
  return room;
}
