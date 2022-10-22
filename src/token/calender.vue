<template>
   <FullCalendar defaultView="dayGridMonth" :plugins="calendarPlugins" />
</template>

<script>
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import '@fullcalendar/core/main.css';
  import '@fullcalendar/daygrid/main.css';
  import { Calendar } from '@fullcalendar/core';//日历插件

  export default {
    components: {
      FullCalendar // make the <FullCalendar> tag available
    },
    data() {
      return {
        calendarPlugins: [ dayGridPlugin ]
      }
    }
  }


</script>

<style>

</style>
