using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace SapoCloneApi.Controllers
{
    [Authorize]
    public class UploadController : ApiController
    {
        [Route("api/upload/image")]
        public IHttpActionResult Image()
        {
            var httpPostedFile = HttpContext.Current.Request.Files["file"];

            if (httpPostedFile != null)
            {
                int length = httpPostedFile.ContentLength;
                string extension = Path.GetExtension(httpPostedFile.FileName);
                string uploadDirectory = "/Uploads/Images";

                string path = Path.Combine(HttpContext.Current.Server.MapPath(uploadDirectory));

                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                string fileName = httpPostedFile.FileName;
                string imagePath = string.Empty;
                string fileNameChangedNotExtension = string.Empty;
                imagePath = Path.Combine(HttpContext.Current.Server.MapPath(uploadDirectory), fileName);
                string fileNameNotExtension = Path.GetFileNameWithoutExtension(fileName);
                int i = 1;

                while (System.IO.File.Exists(imagePath))
                {
                    fileNameChangedNotExtension = string.Format("{0}-{1}", fileNameNotExtension, i);
                    i++;
                    imagePath = Path.Combine(HttpContext.Current.Server.MapPath(uploadDirectory), string.Format("{0}{1}", fileNameChangedNotExtension, extension));
                }

                httpPostedFile.SaveAs(imagePath);
                var url = uploadDirectory + "/" + httpPostedFile.FileName;
                return Ok(url);
            }

            return Ok();
        }
    }
}
