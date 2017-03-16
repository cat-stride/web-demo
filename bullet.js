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
    const date = moment().format('X')
    bullets.push({ sym, content, id, date })
    saveLocalBullets(bullets)
    return bullets
  }

  function setBullet({ id, sym, content }) {
    const bullets = getLocalBullets()
    const bullet = getBullet(id, bullets)
    const date = moment().format('X')
    Object.assign(bullet, { sym, content, date })
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

// TESTING
if (!localStorage.getItem('BULLET_RECORDS') || localStorage.getItem('BULLET_VERSION') !== 'v3') {
  const raw = '[{"sym":">","content":"一个延期","id":0,"date":1489269600},{"sym":">","content":"又一个延期","id":1,"date":1489273200},{"sym":">","content":"一个延期","id":2,"date":1489504539},{"sym":">","content":"又一个延期","id":3,"date":1489504539},{"sym":".","content":"这是今天的待办","id":4,"date":1489504540},{"sym":"x","content":"这是待办完成","id":5,"date":1489504540},{"sym":"o","content":"这是一个事件","id":6,"date":1489504541},{"sym":"-","content":"这是普通的笔记","id":7,"date":1489504542},{"sym":"x","content":"输入一条 bullet，回车或失去焦点时保存","id":8,"date":1489504542},{"sym":"x","content":"然后进入下一条 bullet 编辑","id":9,"date":1489504543},{"sym":"x","content":"正在编辑的状态要区分开","id":10,"date":1489504543},{"sym":"<","content":"删除今天先不做了","id":11,"date":1489504544},{"sym":"x","content":"第一个空格前的字符如果是符号，则放置为符号","id":12,"date":1489504544},{"sym":"x","content":"编辑状态按上下键可以快捷切换符号","id":13,"date":1489504545},{"sym":"<","content":"优化样式","id":14,"date":1489504546},{"sym":"-","content":"这样如何","id":15,"date":1489504546},{"sym":"o","content":"超出计划时长太多了，今天熬夜了","id":16,"date":1489504550},{"sym":"x","content":"增加 bullet 自动滚屏到底，新 bullet 在屏幕靠中央位置","id":17,"date":1489585938},{"sym":"x","content":"向上滚屏，点击 prev 快速检索之前的内容","id":18,"date":1489589596},{"sym":"x","content":"今天之前的笔记不可修改","id":19,"date":1489586988},{"sym":"<","content":"前一天延期和未完成的待办自动写入今天的延期","id":20,"date":1489586066},{"sym":"x","content":"点击符号快捷切换","id":21,"date":1489587214},{"sym":"x","content":"没有符号状态下继续 del 则删除 bullet","id":22,"date":1489591648},{"sym":"x","content":"Fix 用 Tab 切换 bullet 时的编辑状态","id":37,"date":1489671116},{"sym":"x","content":"新的一天列表为空时显示状态的处理","id":40,"date":1489671117},{"sym":"x","content":"Fix 上下切换符号时焦点失去","id":41,"date":1489671124},{"sym":"x","content":"时间戳解析改成毫秒（UNIX）","id":43,"date":1489671717},{"sym":"<","content":"前一天延期和未完成的待办自动写入今天的延期","id":44,"date":1489671126}]'
  localStorage.setItem('BULLET_RECORDS', raw)
  localStorage.setItem('BULLET_INDEX', 44)
  localStorage.setItem('BULLET_VERSION', 'v3')
}
