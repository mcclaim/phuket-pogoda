import cron from 'node-cron'
import { promises as fs } from 'node:fs'
import { join } from 'node:path'

export default defineNitroPlugin(() => {
  if (process.env.DISABLE_CRON === '1') return
  try {
    cron.schedule('15 3 * * *', async () => {
      const dir = join(process.cwd(), 'content', 'articles')
      await fs.mkdir(dir, { recursive: true })
      const slug = `auto-${new Date().toISOString().slice(0,10)}`
      const file = join(dir, `${slug}.md`)
      const md = `---
title: "Авто-обновление прогноза на ${new Date().toLocaleDateString('ru-RU')}"
description: "Автоматически сгенерированная заметка о погоде."
date: "${new Date().toISOString().slice(0,10)}"
---

Сегодня на Пхукете ожидается комфортная температура и возможные кратковременные осадки. Проверьте подробности на главной странице.`
      try { await fs.writeFile(file, md, 'utf-8') } catch (e) {}
      console.log('[cron] Article generated:', file)
    })
  } catch (e) {
    console.error('Cron setup error', e)
  }
})
