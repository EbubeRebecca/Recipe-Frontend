import axios from 'axios';
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file
      .then(file => {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem('token');
          const formData = new FormData();
          formData.append('image', file);

          axios.post('/api/image/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
            resolve({
              default: response.data.url
            });
          })
          .catch(error => {      
            reject(error);
          });
        });
      });
  }

  abort() {
    // Abort the upload process if needed
  }
}

export default MyUploadAdapter;