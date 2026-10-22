import { faker } from '@faker-js/faker'

import db from "#db/client"

import { createPlaylist } from "#db/queries/playlists"
import { createPlaylistTrack } from "#db/queries/playlists_tracks"
import { createTrack } from "#db/queries/tracks"
import { createUser } from '#db/queries/users'

await db.connect()
await seed()
await db.end()
console.log("🌱 Database seeded.")

async function seed() {
  for (let i = 1; i <= 20; i++) await createTrack(faker.music.songName(), Math.floor(Math.random() * (360000 - 60000) + 60000))

  for (let i = 1; i <= 2; i++) {
    const user = await createUser("user" + i, "password" + i)
    const playlist = await createPlaylist(faker.string.uuid(), faker.lorem.sentence(), user.id)
    for (let j = 0; j < 5; j++)
        await createPlaylistTrack(playlist.id, (i - 1) * 5 + j + 1)
  }
}
