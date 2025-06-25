this.http.get(`http://localhost:44312/api/approvemappingrequest/DownloadMapReport?uploadId=${uploadId}`,
{  responseType: 'blob',  observe: 'response'})
.subscribe((response) => {  
const blob = new Blob([response.body!],
{ type: response.headers.get('Content-Type') || 'application/octet-stream' });

  const downloadURL = window.URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = downloadURL;
  // Optional: try to get filename from Content-Disposition header  const contentDisposition = response.headers.get('Content-Disposition');  const filename = contentDisposition?.split('filename=')[1]?.replace(/['"]/g, '') || 'downloaded-file';
  link.download = filename;
link.click();
window.URL.revokeObjectURL(downloadURL);
});
