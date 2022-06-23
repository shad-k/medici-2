import apiClient from './apiClient'
import { CONFIG } from './config'

const localenv = CONFIG.DEV

/* -------------------------------------------------------------------------- */
/*                              Image Data Upload                             */
/* -------------------------------------------------------------------------- */

export const triggerUploadImageData = async (
  name: string,
  formdata: FormData,
  onImageDataProgress: any) => {
  return apiClient.post(
    localenv.api.paths.uploadImageData,
    formdata,
    {
      "headers": {"Content-Type": "form-data"},
      "params": {"collection": name},
      "onUploadProgress": onImageDataProgress
    },
    ).then((response) => {
      console.log(response);
      const res = {
          baseURI: response.data.baseURI,
          totalSupply: response.data.totalSupply,
          randomImageURL: response.data.randomImageURL,
          randomMetadataURL: response.data.randomMetadataURL
      }
      return Promise.resolve(res);
    }).catch((error) => {
      console.log(error);
      return Promise.reject("error");
  })
}

/* -------------------------------------------------------------------------- */
/*                               Metadata Upload                              */
/* -------------------------------------------------------------------------- */

export const triggerUploadMetadata = async (
name: string,
formdata: FormData,
onMetadataProgress: any) => {
  return apiClient.post(
    localenv.api.paths.uploadMetadata,
    formdata,
    {
    "headers": {"Content-Type": "form-data"},
    "params": {"collection": name},
    "onUploadProgress": onMetadataProgress
    },
    ).then((response) => {
    console.log(response);
    return Promise.resolve("ok");
    }).catch((error) => {
    return Promise.reject("error");
  })
}

/* -------------------------------------------------------------------------- */
/*                                Upload Cover                                */
/* -------------------------------------------------------------------------- */

export const uploadCoverImage = async (name: string, file: File) => {
  const formdata = new FormData();
  formdata.append("cover", file)
  
  return apiClient.post(
    localenv.api.paths.uploadImageCover,
    formdata,
    {
      "headers": {"Content-Type": "form-data"},
      "params": {"collection": name},
    })
    .then(function(response) {
      return Promise.resolve(true);
    }).catch(function(error){
      return Promise.resolve(false);
    });
}


