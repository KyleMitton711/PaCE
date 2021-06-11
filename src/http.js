import axios from 'axios';
import router from '@/router';
// import Vue from 'vue'

const VUE_APP_API_URL = process.env.VUE_APP_API_URL;

const http = axios.create({
  baseURL: VUE_APP_API_URL
})

http.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  config.headers.Authorization = "bearer " + token;
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default class APIService {
  isRefreshing = false;

  async get(url, headers = {}, responseType = 'json') {
    try {
      return await http.get(url, {
        headers: {
          ...headers,
        },
        responseType: responseType,
        data: {},
      });
    } 
    catch (e) {
      if (e.response.status == 401) {
        var isRefreshToken = await this.handleUnauthorizedRequest();
        if(isRefreshToken) {
          return await this.get(url, headers, responseType);
        }
      } else if (e.response.status == 403) {
        document.location.href = "/";
        return;
      }
      throw e.response;
    }
  }

  async post(url, content, headers = {}, responseType = 'json') {
    try {
      return await http.post(url, content, {
        headers: {
          ...headers
        },
        responseType: responseType
      });
    }
    catch (e) {
      if (e.response.status == 401) {
        var isRefreshToken = await this.handleUnauthorizedRequest();
        if(isRefreshToken) {
          return await this.post(url, content, headers, responseType);
        }
      } else if (e.response.status == 403) {
        document.location.href = "/";
        return;
      }
      throw e.response;
    }
  }

  async put(url, content, headers = {}) {
    try {
      return await http.put(url, content, {
        headers: {
          ...headers
        }
      });
    }
    catch (e) {
      if (e.response.status == 401) {
        var isRefreshToken = await this.handleUnauthorizedRequest();
        if(isRefreshToken) {
          return await this.put(url, content, headers);
        }
      } else if (e.response.status == 403) {
        document.location.href = "/";
        return;
      }
      throw e.response;
    }
  }

  async patch(url, content, headers = {}) {
    try {
      return await http.patch(url, content, {
        headers: {
          ...headers
        }
      })
    }
    catch (e) {
      if (e.response.status == 401) {
        var isRefreshToken = await this.handleUnauthorizedRequest();
        if(isRefreshToken) {
          return await this.patch(url, content, headers);
        }
      } else if (e.response.status == 403) {
        document.location.href = "/";
        return;
      }
      throw e.response;
    }
  }

  async delete(url, content = {}, headers = {}) {
    try {
      return http.delete(url, {
        headers: {
          ...headers
        },
        data: content
      })
    } 
    catch (e) {
      if (e.response.status == 401) {
        var isRefreshToken = await this.handleUnauthorizedRequest();
        if(isRefreshToken) {
          return await this.delete(url, content, headers);
        }
      } else if (e.response.status == 403) {
        document.location.href = "/";
        return;
      }
      throw e.response;
    }
  }

  async download(requestMethod, url, responseType, headers, payload) {
    try {
      let response = await http({
        method: requestMethod,
        url: url,
        headers: headers,
        responseType: responseType,
        data: payload
      })
      let blob = new Blob([response.data], { type: 'application/pdf' });
      let blobUrl = window.URL.createObjectURL(blob);
      window.open(blobUrl);
    }
    catch (e) {
      if (e.response.status == 401) {
        var isRefreshToken = await this.handleUnauthorizedRequest();
        if(isRefreshToken) {
          await this.download(requestMethod, url, responseType, headers, payload);
          return;
        }
      } else if (e.response.status == 403) {
        document.location.href = "/";
        return;
      }
      throw e.response;
    }
  }

  async handleUnauthorizedRequest() {
    var refreshToken = localStorage.getItem("refreshToken");
    if(refreshToken) {
      return await this.doRefreshToken(refreshToken);
    }
    else if (!router.history.current.meta.publicRoute
      && !router.currentRoute.fullPath.includes("/auth")) {
      if (window.location.pathname.indexOf('admin') > -1) {
        document.location.href = "/admin/auth";
      } else {
        document.location.href = "/";
      }
    }
    return false;
  }

  async doRefreshToken(refreshToken){
    try {
      let response = await this.post('api/refresh-token', { token: refreshToken });
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      return true;
    } 
    catch (e) {
        //invalid refreshToken
        if (e.status == 400) {
          localStorage.removeItem('refreshToken');
          return false;
        }
        throw e.response;
    }
  }


}
