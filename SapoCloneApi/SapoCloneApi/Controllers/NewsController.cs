using SapoCloneApi.Models;
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await db.News.FindAsync(news.Id);

            if (item == null)
            {
                return NotFound();
            }

            db.Entry(news).State = EntityState.Modified;

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

        // POST: api/News
        [ResponseType(typeof(News))]
        public async Task<IHttpActionResult> PostNews(News news)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.News.Add(news);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = news.Id }, news);
        }

        // DELETE: api/News/5
        [HttpPost]
        [Route("api/news/delete/{id}")]
        [ResponseType(typeof(News))]
        public async Task<IHttpActionResult> DeleteNews(int id)
        {
            News news = await db.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            db.News.Remove(news);
            await db.SaveChangesAsync();

            return Ok(news);
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