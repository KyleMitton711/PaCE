import axios from 'axios';
import router from '@/router';
// import Vue from 'vue'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

http.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  config.headers.Authorization = "bearer " + token;
  return config;
}, function (error) {
  return Promise.reject(error);
});

function handleUnauthorizedRequest() {
  if (!router.history.current.meta.publicRoute) {
    // Vue.toasted.error("Your request is not authorized. Please sign in!");
    document.location.href = "/auth";
  }
}

export default class APIService {
  get(url, headers = {}, responseType = 'json') {
    return http.get(url, {
      headers: {
        ...headers,
      },
      responseType: responseType,
      data: {},
    })
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          handleUnauthorizedRequest();
          throw e.response;
        }
        throw e.response;
      });
  }

  post(url, content, headers = {}, responseType = 'json') {
    return http.post(url, content, {
      headers: {
        ...headers
      },
      responseType: responseType
    })
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          handleUnauthorizedRequest();
        }
        throw e.response;
      });
  }

  put(url, content, headers = {}) {
    return http.put(url, content, {
      headers: {
        ...headers
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          handleUnauthorizedRequest();
        }
        throw e.response;
      });
  }

  patch(url, content, headers = {}) {
    return http.patch(url, content, {
      headers: {
        ...headers
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          handleUnauthorizedRequest();
        }
        throw e;
      });
  }

  delete(url, content = {}, headers = {}) {
    return http.delete(url, {
      headers: {
        ...headers
      },
      data: content
    })
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          handleUnauthorizedRequest();
        }
        throw e.response;
      });
  }

  download(requestMethod, url, responseType, headers, payload) {
    headers = {
      ...headers,
    }

    http({
      method: requestMethod,
      url: url,
      headers: headers,
      responseType: responseType,
      data: payload
    })
      .then(function (response) {
        let blob = new Blob([response.data], { type: 'application/pdf' }),
          url = window.URL.createObjectURL(blob)
        window.open(url)
      })
      .catch(e => {
        if (e.response.status == 401) {
          handleUnauthorizedRequest();
        }
        throw e.response;
      });
  }
}
