using SapoCloneApi.Models;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace SapoCloneApi.Controllers
{
    [Authorize]
    public class NewsController : ApiController
    {
        private SapoCloneContext db = new SapoCloneContext();

        // GET: api/News
        public IQueryable<News> GetNews()
        {
            return db.News;
        }

        public async Task<IHttpActionResult> GetNews(string keyword, int pageIndex, int pageSize)
        {
            var items = await db.News.Where(m => (string.IsNullOrEmpty(keyword) || m.UnsignName.Contains(keyword))).OrderByDescending(m => m.Id).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return Ok(new
            {
                items,
                totalItems = db.News.Count(m => (string.IsNullOrEmpty(keyword) || m.UnsignName.Contains(keyword)))
            });
        }

        // GET: api/News/5
        [ResponseType(typeof(News))]
        public async Task<IHttpActionResult> GetNews(int id)
        {
            News news = await db.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            return Ok(news);
        }

        // PUT: api/News/5
        [HttpPost]
        [Route("api/news/update")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutNews(News news)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var item = await db.News.FindAsync(news.Id);

                if (item == null)
                {
                    return NotFound();
                }

                item.Title = news.Title;
                item.Short = news.Short;
                item.Full = news.Full;
                item.Published = news.Published;
                item.ImageUrl = news.ImageUrl;
                item.CategoryId = news.CategoryId;
                item.UpdatedOnUtc = DateTime.Now;
                item.UnsignName = Common.Utils.Ucs2Convert(news.Title);
                db.Entry(item).State = EntityState.Modified;

                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    throw;
                }

                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        // POST: api/News
        [ResponseType(typeof(News))]
        public async Task<IHttpActionResult> PostNews(News news)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                news.UnsignName = Common.Utils.Ucs2Convert(news.Title);
                news.CreatedOnUtc = DateTime.Now;
                news.UpdatedOnUtc = DateTime.Now;
                db.News.Add(news);
                await db.SaveChangesAsync();

                return CreatedAtRoute("DefaultApi", new { id = news.Id }, news);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        // DELETE: api/News/5
        [HttpPost]
        [Route("api/news/delete/{id}")]
        [ResponseType(typeof(News))]
        public async Task<IHttpActionResult> DeleteNews(int id)
        {
            try
            {

                News news = await db.News.FindAsync(id);
                if (news == null)
                {
                    return NotFound();
                }

                db.News.Remove(news);
                await db.SaveChangesAsync();

                return Ok(new
                {
                    status = true,
                    data = news
                });
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NewsExists(int id)
        {
            return db.News.Count(e => e.Id == id) > 0;
        }
    }
}