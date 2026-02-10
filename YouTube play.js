case 'play': {
  if (!text) return reply(`Contoh: ${prefix + command} k3g song`)
  try {
    reply('🎧 Mencari lagu...')

    const api = `https://api.apocalypse.web.id/download/play?q=${encodeURIComponent(text)}&bitrate=192`
    const res = await axios.get(api)
    const json = res.data
    if (!json.status) return reply('❌ Lagu tidak ditemukan')

    const r = json.result

    let thumbBuffer = Buffer.alloc(0)
    try {
      const thumb = await fetch(r.thumbnail)
      thumbBuffer = Buffer.from(await thumb.arrayBuffer())
    } catch {}

    await sock.sendMessage(m.chat, {
      audio: { url: r.download_url },
      mimetype: 'audio/mpeg',
      fileName: `${r.title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: r.title,
          body: `Channel: ${r.channel} | Duration: ${r.duration}`,
          mediaType: 2,
          thumbnail: thumbBuffer,
          mediaUrl: r.download_url,
          sourceUrl: r.download_url,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    reply('❌ Error play music')
  }
}
break