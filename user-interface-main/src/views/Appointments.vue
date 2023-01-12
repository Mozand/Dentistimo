<template>
  <div>
    <Navbar/>
    <h1>Welcome to</h1>

    <!-- Header -->
    <div v-if="currentDentist">
      <h1 style="color: white">{{ currentDentist.name }}</h1>
      <h2></h2>
      <!--   <ul id="v-for-object" class="demo">
        <li v-for="(value, key) in currentDentist.openinghours" :key="key">
          {{ key }} {{ value }}
        </li>
      </ul>-->
      <table class="openingHour">
        <thead>
          <th>Day</th>
          <th>Opening Hours</th>
        </thead>
        <tbody v-for="(value, key) in currentDentist.openinghours" :key="key">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tbody>
      </table>
    </div>

    <!-- Calendar -->

    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right> mdi-menu-down </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            class="calender"
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Booking -->

    <!-- Date -->
    <div class="container">
      <b-form @submit.prevent="createRequest">
        <h1 style="color: white">Your request</h1>
        <div>
          <b-form-group
            id="input-group-5"
            label="Choose a date:"
            label-size="lg"
            label-for="input-4"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7"
          >
            <b-form-datepicker
              id="input-4"
              :date-disabled-fn="dateDisabled"
              v-model="value"
              required
              locale="en"
            ></b-form-datepicker>
          </b-form-group>
        </div>

        <div v-if="chosenDay && chosenDayOpeningHours">
          <p class="text-light capitalize">
            On {{ chosenDay }}'s we are open {{ chosenDayOpeningHours }}
          </p>
        </div>

        <div>
          <b-form-group
            id="input-group-5"
            label="Choose a Time:"
            label-size="lg"
            label-for="input-5"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7"
          >
            <b-form-select
              id="input-5"
              v-model="chosenSlot"
              :options="slots"
              required
              >Please Choose A Time</b-form-select
            >
          </b-form-group>
        </div>

        <div>
          <p v-if="warningText" class="text-light">
            Please Choose From Opening Hours
          </p>
        </div>

        <!-- Button -->
        <b-button type="submit" variant="danger" :disabled="disableButton"
          >REQUEST BOOKING</b-button
        >

        <!-- <v-btn  @click="createRequest" block color="primary">
      Request Booking
    </v-btn>-->
      </b-form>

      <!-- !form -->
    </div>
    <div>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
export default {
  components: {Navbar},
  data() {
    
    return {
      currentDentist: {},
      numberOfDentists: 0,
      openingHours: {},
      publish2: {
        topic: "availability/getappointments",
        qus: 1,
        payload: this.$route.params.dentistid,
      },
      publish3: {
        topic: "dentist/getdentistbyId",
        qus: 1,
        payload: this.$route.params.dentistid,
      },
      focus: "",
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "4day": "4 Days",
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
        "red",
      ],
      names: [
        "Meeting",
        "Holiday",
        "PTO",
        "Travel",
        "Event",
        "Birthday",
        "Conference",
        "Party",
      ],
      slots: [
        { text: "Select Time", value: null, disabled: true },
        "7:00",
        "7:30",
        "8:00",
        "8:30",
        "9:00",
        "9:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        { text: "12:00 Lunch", value: null, disabled: true },
        "13:00",
        "13:30",
        { text: "14:00 Fika :)", value: null, disabled: true },
        "14:30",
        "15:00",
        "15:30",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
      ],
      value: "",
      form: {
        hour: "",
        minutes: "",
        slots: "",
      },
    
      chosenDay: "",
      chosenDayOpeningHours: "",
      thisDay: 9,
      chosenSlot: "",
      openTime: 0,
      closeTime: 0,
      disableButton: true,
      warningText: false,
    };
  },

  watch: {
    value: function () {

      let getDayFromValue = new Date(this.value);
      let getDay = getDayFromValue.getDay();
      this.thisDay = getDay;
      console.log(getDay);

      let openingthisDay = Object.keys(this.currentDentist.openinghours)[
        getDay - 1
      ];
      let openingHoursThisDay = Object.values(this.currentDentist.openinghours)[
        getDay - 1
      ];

      this.chosenDay = openingthisDay;
      this.chosenDayOpeningHours = openingHoursThisDay;

      console.log(openingthisDay);
      console.log(openingHoursThisDay);

      this.disableButton = true;
    },
    chosenSlot: function () {

      //Get Time
      let openingHour = this.chosenDayOpeningHours.substring(
        0,
        this.chosenDayOpeningHours.indexOf(":")
      );

      let closingHour1 = this.chosenDayOpeningHours.substring(
        this.chosenDayOpeningHours.indexOf("-") + 1
      );

      let closingHour2 = closingHour1.substring(0, closingHour1.indexOf(":"));

      //Time In Form
      let checkTimeChosen = this.chosenSlot;

      // //Integers
      let startInt = parseInt(openingHour);
      let closeInt = parseInt(closingHour2);
      let chosenTime = parseInt(checkTimeChosen);

      if (chosenTime >= startInt && chosenTime < closeInt) {
        this.disableButton = false;
        this.warningText = false;
      } else {
        this.disableButton = true;
        this.warningText = true;
      }
    },
  },
  methods: {
    getDentist() {
      let { topic, qos, payload } = this.publish3;
      this.$client.publish(topic, payload, qos, (error) => {
        console.log("Step 1 Publish");

        if (error) {
          console.log(error);
        }
      });

      this.$client.on("message", (topic, payload) => {
        console.log(topic, payload.toString());
        if (topic == "ui/get-dental-clinic") {
          console.log("Dentist RCEIVED!!!!");

          let response = JSON.parse(payload);
          console.log("RESPONSE HERE");
          console.log(response);
          console.log("Dentists: ", response.dentists);

          this.currentDentist = response;
          this.numberOfDentists = response.dentists;
          this.openingHours = response.openinghours;

          console.log(this.currentDentist);
        }
      });
    },
    getAppointments() {
      let { topic, qos, payload } = this.publish2;
      this.$client.publish(topic, payload, qos, (error) => {
        console.log("Step 1 Publish");
        // console.log(payload.toString());

        if (error) {
          console.log(error);
        }
      });

      this.$client.on("message", (topic, payload) => {
        console.log(topic, payload.toString());
        // let response;

        if (topic == "ui/getappointments") {
          console.log("Appointments Received: ");

          let response = JSON.parse(payload);
          console.log("APPOiNTMnt RESPONSE HERE");
          console.log(response);

          // this.currentDentist = response;
          // this.openingHours.push(response.openinghours);
          // this.events = response;

          //Allappointments
          this.events = response;

          // this.items.push(response);
          // this.items = payload.toString();
          // console.log(this.currentDentist);
          console.log("Appointments: ", response);
          console.log("Appointments Events: ", this.events);
        }

        // console.log("ARRAY: ", this.items);
      });
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      console.log(start, end);
      // const events = [];

      // const min = new Date(`${start.date}T00:00:00`);
      // const max = new Date(`${end.date}T23:59:59`);
      // const days = (max.getTime() - min.getTime()) / 86400000;
      // const eventCount = this.rnd(days, days + 20);

      // for (let i = 0; i < eventCount; i++) {
      //   const allDay = this.rnd(0, 3) === 0;
      //   const firstTimestamp = this.rnd(min.getTime(), max.getTime());
      //   const first = new Date(firstTimestamp - (firstTimestamp % 900000));
      //   const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
      //   const second = new Date(first.getTime() + secondTimestamp);

      //   events.push({
      //     name: this.names[this.rnd(0, this.names.length - 1)],
      //     start: first,
      //     end: second,
      //     color: this.colors[this.rnd(0, this.colors.length - 1)],
      //     timed: !allDay,
      //   });
      // }

      // this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    createRequest() {
      let startDate = this.value + " " + this.chosenSlot;
      let startDateToDate = new Date(startDate);

      let add30Mins = new Date(startDateToDate.getTime() + 90 * 60000);

      // console.log("add 30 ", add30Mins);

      // let added = add30Mins.toString();
      let added2 = add30Mins.toISOString().slice(0, 16);

      let newRequest = {
        dentist: this.$route.params.dentistid,
        name: this.$store.state.firstname + " " + this.$store.state.lastname,
        start: startDate,
        end: added2,
        user: this.$store.state.id,
        issuance: Date.now(),
        numberOfDentists: this.numberOfDentists,
        color: this.colors[this.rnd(0, this.colors.length - 1)],
      };
      console.log(newRequest);

      let newRequestAsString = JSON.stringify(newRequest);

      this.$client.publish(
        "newappointment",
        newRequestAsString,
        { qos: 1, retain: false },
        (error) => {
          if (error) {
            console.error(error);
          }
        }
      );

      this.$client.on("message", (topic, payload) => {
        console.log(topic, payload.toString());
        // let response;
        if (topic == "ui/approved") {
          this.$bvToast.toast(
            `Booking Approved for ${
              this.$store.state.firstname + " " + this.$store.state.lastname
            }`,
            {
              title: "New Appointment Confirmation",
              autoHideDelay: 5000,
              appendToast: false,
              solid: true,
              variant: "success",
            }
          );

          this.getAppointments();

          // alert("Booking Made");
        } else if (topic == "ui/notapproved") {
          console.log(topic, payload.toString());

          this.$bvToast.toast("Fully Reserved", {
            title: "Schedule is full",
            autoHideDelay: 5000,
            appendToast: false,
            solid: true,
            variant: "danger",
          });

        } else if (topic == "ui/allreadyapproved") {
          this.$bvToast.toast("Allready Reserved", {
            title: "You Allready Have Booked This Time",
            autoHideDelay: 5000,
            appendToast: false,
            solid: true,
            variant: "warning",
          });
        }
      });
    },
    printUser() {
      console.log(this.$store.state.username);
      console.log(
        this.$store.state.firstname + " " + this.$store.state.lastname
      );
    },
    dateDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      const weekday = date.getDay();
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6;
    },
  },

  mounted() {
    this.getDentist();
    this.getAppointments();
    this.$refs.calendar.checkChange();
  },
};
</script>

<style>
#input-5 {
  font-size: 20px;
}
#input-group-5 {
  color: antiquewhite;
  font-size: 20px;
}
.text-success {
  color: blanchedalmond;
}
.openingHour {
  width: 30%;
  border-collapse: collapse;
  margin: 30px auto;
  border: black;
  box-shadow: 0 5px 10px rgb(189, 188, 188);
  background-color: white;
}

thead {
  box-shadow: 0 2px 5px rgb(4, 173, 240);
}

td {
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-size: 20px;
  letter-spacing: -0.8px;
  word-spacing: -1px;
  color: #4d4b4b;
  font-weight: 400;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  text-align: center;
  border: 1px solid #999;
  padding: 0.3rem;
}

th {
  padding: 1rem 2rem;
  background-color: rgb(241, 243, 245);
  color: rgb(12, 38, 155);
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  height: 40px;
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
  word-spacing: -1px;
  font-weight: 900;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: uppercase;
  text-align: center;
  border: 1px solid #999;
  padding: 0.5rem;
}

tr:nth-child(even) {
  background-color: hsl(187, 87%, 71%);
}

.fill-height {
  width: 98%;
}
.container {
  margin-top: 100px;
  background-color: #1751e462;
  border-radius: 10px;
}
table tbody td::first-letter{
  text-transform: capitalize;
}

.capitalize{
  text-transform: capitalize;
}
</style>
