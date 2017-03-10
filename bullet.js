function buildRecords() {
  const BULLET_RECORDS = 'BULLET_RECORDS'
  const BULLET_INDEX = 'BULLET_INDEX'

  function parseJSON(raw) {
    try {
      return JSON.parse(raw)
    } catch (e) {
      return null
    }
  }

  function getLocalCount() {
    return +localStorage.getItem(BULLET_INDEX)
  }

  function incLocalCount() {
    const count = getLocalCount() + 1
    localStorage.setItem(BULLET_INDEX, count)
    return count
  }

  function getLocalBullets() {
    const raw = localStorage.getItem(BULLET_RECORDS)
    return parseJSON(raw) || []
  }

  function saveLocalBullets(bullets) {
    localStorage.setItem(BULLET_RECORDS, JSON.stringify(bullets))
    return bullets
  }

  function getBullet(id, bullets) {
    return (bullets || getLocalBullets()).find(bullet => bullet.id === id)
  }

  function addBullet({ sym, content }) {
    const bullets = getLocalBullets()
    const id = incLocalCount()
    bullets.push({ sym, content, id })
    saveLocalBullets(bullets)
    return bullets
  }

  function setBullet({ id, sym, content }) {
    const bullets = getLocalBullets()
    const bullet = getBullet(id, bullets)
    Object.assign(bullet, { sym, content })
    saveLocalBullets(bullets)
    return bullets
  }

  function removeBullet({ id }) {
    const bullets = getLocalBullets()
    const index = bullets.indexOf(getBullet(id, bullets))
    bullets.splice(index, 1)
    saveLocalBullets(bullets)
    return bullets
  }

  return {
    getLocalBullets,
    getBullet,
    addBullet,
    setBullet,
    removeBullet,
  }
}
