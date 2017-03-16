{
  /* global buildRecords */
  const records = buildRecords()
  const initRecord = () => ({ sym: '?', content: '' })
  const Main = {
    data() {
      return {
        rawBullets: records.getLocalBullets(),
        editingBullet: initRecord(),
        today: moment().format('YYYY/M/D/dd'),
        dayRange: 2,
      }
    },
    computed: {
      bulletsInDays() {
        return this.rawBullets.reduce((prev, record) => {
          const day = moment.unix(record.date).format('YYYY/M/D/dd')
          prev[day] = prev[day] || []
          record.day = day
          prev[day].push(record)
          return prev
        }, {})
      },
      alldays() {
        const days = Object.keys(this.bulletsInDays).sort()
        if (days.indexOf(this.today) > -1) return days
        return days.concat(this.today)
      },
      days() {
        return this.alldays.slice(-this.dayRange)
      },
    },
    mounted() {
      setTimeout(() => {
        window.scroll(0, document.body.clientHeight)
      }, 300)
    },
    methods: {
      addBullet(record) {
        const updated = records.addBullet(record)
        this.rawBullets = updated
        this.editingBullet = initRecord()
        this.$nextTick(() => {
          window.scroll(0, document.body.clientHeight)
          this.$refs.editingInput.focus()
        })
      },
      setBullet(record) {
        const updated = records.setBullet(record)
        this.rawBullets = updated
      },
      removeBullet(record) {
        const updated = records.removeBullet(record)
        this.rawBullets = updated
      },
      showPrev() {
        this.dayRange += 1
      },
    },
    template: `
      <section class="container">
        <button class="prevbutton" v-if="dayRange < alldays.length" @click="showPrev">Prev</button>
        <transition-group name="slide-fade">
          <div v-for="day of days" :key="day">
            <h4>{{ day }}</h4>
            <bullet-input v-for="bullet of bulletsInDays[day]"
              :key="bullet.id"
              :bullet="bullet"
              @submit="setBullet"
              @delete="removeBullet"
              :readonly="bullet.day !== today"></bullet-input>
          </div>
        </transition-group>
        <h4 v-if="days.indexOf(today) < 0">{{ today }}</h4>
        <bullet-input ref="editingInput" :bullet="editingBullet" @submit="addBullet"></bullet-input>
      </section>
    `,
  }


  const Ctor = Vue.extend(Main)
  new Ctor().$mount('#app')
}
