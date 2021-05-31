const { BlobServiceClient } = require("@azure/storage-blob");

const azure_uri = process.env.VUE_APP_AZURE_URI;
const azure_sas = process.env.VUE_APP_AZURE_SAS;

const blobServiceClient = new BlobServiceClient(`${azure_uri}${azure_sas}`);

const containerName = "project";

async function upload(file) {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const content = file;
  let filename = file.name.split('.');
  let fileext = filename.pop();

  const blobName = filename.join('.') + new Date().getTime() + '.' + fileext;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blockBlobClient.uploadBrowserData(file, options);
  
  return `${azure_uri}project/` + blobName;
}

export {
  upload
}