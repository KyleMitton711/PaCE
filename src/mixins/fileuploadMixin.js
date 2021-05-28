import vue2Dropzone from "vue2-dropzone";
import { upload } from "@/fileupload";

export default {
  components: {
    vueDropzone: vue2Dropzone,
  },
  data: () => ({
    form: {
      name: null,
      description: null,
      abbreviation: null,
      logo: null,
      url: null,
      projectLead: null,
    },
    dropzoneOptions: {
      url: "https://httpbin.org/post",
      thumbnailWidth: 150,
      maxFilesize: 50,
      maxFiles: 1,
      headers: { "My-Awesome-Header": "header value" },
      autoDiscover: false,
      autoProcessQueue: false,
      autoQueue: false,
      acceptedFiles: "image/*",
      init: function () {
        this.on("addedfile", function () {
          if (this.files[1] != null) {
            this.removeFile(this.files[0]);
          }
        });
      },
    },
  }),

  methods: {
    async fileAdded(files) {
      let file = files[0];

      let filename = file.name || file.localURL;
      let filetype = file.type;
      var reader = new FileReader();
      var dataUrl;
      await new Promise((resolve, reject) => {
        reader.onload = (readerEvent) => {
          var image = new Image();
          image.onload = (imageEvent) => {
            var canvas = document.createElement("canvas"),
              max_size = 240,
              width = image.width,
              height = image.height;
            if (width > height) {
              if (width > max_size) {
                height *= max_size / width;
                width = max_size;
              }
            } else {
              if (height > max_size) {
                width *= max_size / height;
                height = max_size;
              }
            }
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(image, 0, 0, width, height);
            dataUrl = canvas.toDataURL(filetype);
            dataUrl = this.dataURLToBlob(dataUrl);
            resolve(1);
          };
          image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
      });

      dataUrl.name = filename;
      dataUrl.localURL = filename;
      dataUrl.lastModifiedDate = new Date().getTime();
      this.form.logo = await upload(dataUrl);
    },

    dataURLToBlob(dataURL) {
      var BASE64_MARKER = ";base64,";
      var parts, contentType, raw;
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
        parts = dataURL.split(",");
        contentType = parts[0].split(":")[1];
        raw = parts[1];
        return new Blob([raw], { type: contentType });
      }

      parts = dataURL.split(BASE64_MARKER);
      contentType = parts[0].split(":")[1];
      raw = window.atob(parts[1]);
      var rawLength = raw.length;

      var uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
    },
  },
};