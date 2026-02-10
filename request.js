case "aio": {
  if (!text) return reply(`Contoh:\n${prefix}${command} https://link`)

  const axios = await import("axios").then(m => m.default)

  async function aioDownload(url) {
    const res = await axios.get(
      `https://savevideoid.vercel.app/api/download?url=${encodeURIComponent(url)}`
    )
    return res.data
  }

  try {
    reply("⏳ Downloading media...")

    const data = await aioDownload(text)
    if (!data.success) return reply("❌ Gagal download!")

    const results = data.results || []
    if (!results.length) return reply("❌ Media tidak ditemukan")

    for (let r of results) {
      let videoUrl = r.hd_url || r.download_url
      let audioUrl = r.music
      let thumb = r.thumbnail

      let caption = `📥 *AIO Downloader*\n\n`
      caption += `🌐 Platform: ${data.platform}\n`
      caption += `📌 Title: ${r.title || "-"}\n`
      caption += `⏱ Duration: ${r.duration || "-"} sec\n`
      caption += `🔗 Source: ${data.original_url}`

      // VIDEO
      if (videoUrl) {
        await conn.sendMessage(m.chat, {
          video: { url: videoUrl },
          mimetype: "video/mp4",
          caption
        }, { quoted: m })
      }

      // AUDIO
      if (audioUrl) {
        await conn.sendMessage(m.chat, {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          fileName: "aio.mp3"
        }, { quoted: m })
      }

      // THUMBNAIL
      if (thumb) {
        await conn.sendMessage(m.chat, {
          image: { url: thumb },
          caption: "🖼 Thumbnail"
        }, { quoted: m })
      }
    }

  } catch (e) {
    console.error(e)
    reply("❌ Error AIO Downloader")
  }
}
break