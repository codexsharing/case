case 'skipsfl': {
  if (!text) return reply(`Contoh: ${prefix + command} https://sfl.gl/xxxx`)

  try {
    reply('⏳ Bypass SFL...')

    const api = `https://api.apocalypse.web.id/tools/sfl?apikey=NEMOPHILA&url=${encodeURIComponent(text)}`
    const res = await axios.get(api)
    const json = res.data

    if (!json.status) return reply('❌ Gagal bypass')

    const d = json.data

    let msg = `🔓 *SFL Bypass Success*\n\n`
    msg += `🔗 Original: ${d.original_url}\n`
    msg += `✅ Bypassed: ${d.bypassed_url}\n\n`
    msg += `📊 Stats:\n`
    msg += `• Duration: ${d.stats.duration}s\n`
    msg += `• API Time: ${d.stats.api_duration}\n`
    msg += `• Clicks: ${d.stats.clicks}\n`
    msg += `• Popups: ${d.stats.popups}\n`
    msg += `• Ads Blocked: ${d.stats.adsBlocked}\n`
    msg += `• Requests: ${d.stats.requests}`

    reply(msg)

  } catch (e) {
    console.error(e)
    reply('❌ Error bypass SFL')
  }
}
break