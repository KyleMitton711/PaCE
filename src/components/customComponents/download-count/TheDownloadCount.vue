<template>
  <v-card flat class="mb-7">
    <v-card-text class="pa-5 success">
      <div class="d-flex align-center">
        <div class="align-self-center">
          <h1 class="white--text display-1">
            <i class="icon-cloud-download"></i>
          </h1>
        </div>
        <div class="mx-4">
          <h3 class="card-title white--text title font-weight-regular">
            {{ title }}
          </h3>
          <h6
            class="card-subtitle white--text op-5 subtitle-2 font-weight-regular"
          >
            {{ subtitle }}
          </h6>
        </div>
      </div>
      <v-row class="mt-2">
        <v-col cols="4" class="d-flex align-center">
          <h2 class="font-weight-light white--text text-nowrap">{{ value }}</h2>
        </v-col>
        <v-col cols="8">
          <div class="float-right" v-show="elementVisible">
            <vue-apex-charts
              type="bar"
              height="70px"
              width="150px"
              :options="DownloadChart.chartOptions"
              :series="DownloadChart.series"
            ></vue-apex-charts>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "TheDownloadCount",
  props: {
    title: String,
    subtitle: String,
    value: {
      type: [String, Number]
    },
    periodDays: Array
  },
  data: () => ({
    elementVisible: false,
    DownloadChart: {
      series: [
        {
          name: "",
          data: [4, 5, 2, 10, 9, 12, 4, 9, 4, 5, 3, 10, 9, 12, 10, 9, 12, 4, 9]
        }
      ],
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "20%"
          }
        },
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        },
        colors: "rgba(255, 255, 255, 0.5)",
        chart: {
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          theme: "dark"
        }
      }
    },
  }),
  created() {
    setTimeout(() => (this.elementVisible = true), 10);
  },
  components: {
    VueApexCharts,
  },
};
</script>