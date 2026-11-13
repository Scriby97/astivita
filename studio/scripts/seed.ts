// Startinhalt: Bettinas Texte (web/src/lib/placeholder.ts) als erstes Dokument «Website» nach Sanity übertragen.
// Ausführen (einmalig, nach dem Anlegen des Projekts): npm run seed
// Überschreibt nichts: das Dokument wird nur angelegt, wenn es noch nicht existiert (createIfNotExists).
// Der Wartungsmodus ist vorbereitet (Passwort «hund»), aber ausgeschaltet – im Studio unter «Wartung» einschaltbar.
import {getCliClient} from 'sanity/cli'
import {placeholderSettings} from '../../web/src/lib/placeholder'

const client = getCliClient({apiVersion: '2026-11-01'})

let n = 0
const key = () => `s${(n++).toString(36)}`

// Reiner Text → Editor-Blöcke («## » = Zwischentitel, «- » = Aufzählung, Leerzeile = neuer Absatz)
function blocks(value: unknown) {
  if (typeof value !== 'string') return value
  return value.split(/\n{2,}/).flatMap((para) => {
    const lines = para.split('\n')
    const out: object[] = []
    if (lines[0].startsWith('## ')) out.push(block(lines.shift()!.slice(3), 'h3'))
    const plain = lines.filter((l) => !l.startsWith('- '))
    if (plain.length) out.push(block(plain.join('\n')))
    for (const b of lines.filter((l) => l.startsWith('- '))) out.push({...block(b.slice(2)), listItem: 'bullet', level: 1})
    return out
  })
}

const block = (text: string, style = 'normal') => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: [],
  children: [{_type: 'span', _key: key(), text, marks: []}],
})

const {introText, aboutText, offerText, privacyText, ...rest} = placeholderSettings
await client.createIfNotExists({
  ...rest,
  _id: 'siteSettings',
  _type: 'siteSettings',
  introText: blocks(introText),
  aboutText: blocks(aboutText),
  ...(offerText ? {offerText: blocks(offerText)} : {}),
  ...(privacyText ? {privacyText: blocks(privacyText)} : {}),
  maintenance: false,
  maintenanceText: 'Hier entsteht die neue Website von Astivita Hundetherapie – bald geht’s los!',
  previewPassword: 'hund',
})
console.log('Fertig: Dokument «Website» angelegt (falls es noch nicht existierte).')
