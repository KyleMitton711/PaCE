import Vue from "vue"
import moment from 'moment'

function dateFormat(date, format) {
  if (!date) {
    return "";
  }

  if (format && format.length > 0) {
    return moment(date).format(format);
  }

  return moment(date).format("DD/MM/YYYY");
}

function priceFormat(price) {
  if (!price) {
    return "";
  }

  return "$" + price.toFixed(2);
}

function volumeFormat(volume) {
  if (!volume) {
    return "";
  }

  return volume.toLocaleString(
    'en-US', // leave undefined to use the browser's locale,
               // or use a string like 'en-US' to override it.
    {}
  );
}

export default {
  install(Vue) {
    Vue.filter('dateFormat', dateFormat)
    Vue.filter('priceFormat', priceFormat)
    Vue.filter('volumeFormat', volumeFormat)
  }
}