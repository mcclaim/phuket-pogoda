// Simple generator to create sample articles (simulating GPT content)
const fs = require('fs')
const path = require('path')
const day = new Date().toISOString().slice(0,10)
const dir = path.join(process.cwd(), 'content', 'articles')
fs.mkdirSync(dir, { recursive: true })
const slug = `manual-${day}`
const file = path.join(dir, `${slug}.md`)
const content = `---
title: "Ежедневный обзор погоды на ${new Date().toLocaleDateString('ru-RU')}"
description: "Краткий обзор текущей ситуации и прогноза на 5 дней."
date: "${day}"
---

Сегодня вероятна переменная облачность и комфортная температура. Следите за ветром и осадками.`
fs.writeFileSync(file, content, 'utf-8')
console.log('Article created:', file)
