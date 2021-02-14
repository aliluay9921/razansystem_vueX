<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Razan system</h1>
          </div>
        </div>
      </div>
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          <!-- first card   -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{ dashboardCount.orders }}</h3>

                <p>Orders</p>
              </div>
              <div class="icon">
                <i class="ion ion-bag"></i>
              </div>
              <a href="#" class="small-box-footer"
                >More info <i class="fas fa-arrow-circle-right"></i
              ></a>
            </div>
          </div>
          <!-- end first card  -->

          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3>{{ dashboardCount.tickets }}</h3>

                <p>Tickets</p>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
              <a href="#" class="small-box-footer"
                >More info <i class="fas fa-arrow-circle-right"></i
              ></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>{{ dashboardCount.users }}</h3>

                <p>User Registrations</p>
              </div>
              <div class="icon">
                <i class="ion ion-person-add"></i>
              </div>
              <a href="#" class="small-box-footer"
                >More info <i class="fas fa-arrow-circle-right"></i
              ></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>{{ dashboardCount.flighlines }}</h3>

                <p>flighlines</p>
              </div>
              <div class="icon">
                <i class="ion ion-pie-graph"></i>
              </div>
              <a href="#" class="small-box-footer"
                >More info <i class="fas fa-arrow-circle-right"></i
              ></a>
            </div>
          </div>
          <!-- ./col -->
        </div>
        <!-- /.row -->
        <!-- Main row -->

        <!-- /.row (main row) -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <chart
      v-if="dashboardCount.userCount != null"
      :chartdata="chartdata"
      :options="options"
    ></chart>
    <!-- /.content -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Chart from "../components/chart.vue";
export default {
  name: "Home",
  components: {
    Chart,
  },
  computed: {
    ...mapState(["dashboardCount"]),
    chartdata() {
      let chatData = this.$store.state.chartdata;
      chatData.labels = this.getSevenDays;
      return chatData;
    },
    getSevenDays() {
      let date = new Date();
      let days = [];
      for (let index = 0; index < 7; index++) {
        var result = date;
        result.setDate(result.getDate() - index);
        var dateToday =
          result.getFullYear() +
          "-" +
          (result.getMonth() + 1) +
          "-" +
          result.getDate();
        days.unshift(this.days[result.getDay()] + "\n " + dateToday);
      }
      console.log(days);
      return days;
    },
  },
  methods: {
    ...mapActions(["countDashboard"]),
  },
  created() {
    // this.chartdata = {
    //   labels: this.getSevenDays,
    //   datasets: [
    //     {
    //       label: "زبائن مسجلين",
    //       borderColor: "#FC2525",
    //       pointBackgroundColor: "white",
    //       borderWidth: 1,
    //       pointBorderColor: "white",

    //       data: [40, 30, 30, 22, 4, 5, 21],
    //     },
    //     {
    //       label: "حجوزات منشئة",
    //       borderColor: "#05CBE1",
    //       pointBackgroundColor: "white",
    //       pointBorderColor: "white",
    //       borderWidth: 1,

    //       data: [30, 50, 40, 1, 10, 0, 20],
    //     },
    //     // {
    //     //   label: "Data One",
    //     //   backgroundColor: "#f8ff32",
    //     //   data: [40, 20],
    //     // },
    //   ],
    // };
    this.countDashboard();
  },
  data() {
    return {
      months: [
        "يناير",
        "فبراير",
        "مارس",
        "إبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ],

      days: [
        "اﻷحد",
        "اﻷثنين",
        "الثلاثاء",
        "اﻷربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ],
      sevenDays: ["test"],
      // chartdata: {},
      options: {
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true, // minimum value will be 0.
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
