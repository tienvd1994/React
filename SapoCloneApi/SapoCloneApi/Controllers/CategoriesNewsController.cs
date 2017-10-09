using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using SapoCloneApi.Models;

namespace SapoCloneApi.Controllers
{
    public class CategoriesNewsController : ApiController
    {
        private SapoCloneContext db = new SapoCloneContext();

        // GET: api/CategoriesNews
        public IQueryable<CategoriesNew> GetCategoriesNews()
        {
            return db.CategoriesNews;
        }

        public async Task<IHttpActionResult> GetCategoriesNews(string keyword, int pageIndex, int pageSize)
        {
            var items = await db.CategoriesNews.Where(m => (string.IsNullOrEmpty(keyword) || m.UnsignName.Contains(keyword))).OrderByDescending(m => m.Id).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return Ok(new
            {
                items,
                totalItems = db.CategoriesNews.Count(m => (string.IsNullOrEmpty(keyword) || m.UnsignName.Contains(keyword)))
            });
        }

        // GET: api/CategoriesNews/5
        [ResponseType(typeof(CategoriesNew))]
        public async Task<IHttpActionResult> GetCategoriesNew(int id)
        {
            CategoriesNew categoriesNew = await db.CategoriesNews.FindAsync(id);
            if (categoriesNew == null)
            {
                return NotFound();
            }

            return Ok(categoriesNew);
        }

        // PUT: api/CategoriesNews/5
        [HttpPost]
        [Route("api/categoriesnews/update")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCategoriesNew(CategoriesNew categoriesNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await db.CategoriesNews.FindAsync(categoriesNew.Id);

            if (item == null)
            {
                return NotFound();
            }

            item.Published = true;
            item.Name = categoriesNew.Name;
            item.Description = categoriesNew.Description;
            item.UnsignName = Common.Utils.Ucs2Convert(categoriesNew.Name);
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

        // POST: api/CategoriesNews
        [ResponseType(typeof(CategoriesNew))]
        public async Task<IHttpActionResult> PostCategoriesNew(CategoriesNew categoriesNew)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            categoriesNew.Published = true;
            categoriesNew.CreatedOnUtc = DateTime.Now;
            categoriesNew.UpdatedOnUtc = DateTime.Now;
            categoriesNew.UnsignName = Common.Utils.Ucs2Convert(categoriesNew.Name);
            db.CategoriesNews.Add(categoriesNew);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = categoriesNew.Id }, categoriesNew);
        }

        // DELETE: api/CategoriesNews/5
        [HttpPost]
        [Route("api/categoriesnews/delete/{id}")]
        [ResponseType(typeof(CategoriesNew))]
        public async Task<IHttpActionResult> DeleteCategoriesNew(int id)
        {
            CategoriesNew categoriesNew = await db.CategoriesNews.FindAsync(id);
            if (categoriesNew == null)
            {
                return NotFound();
            }

            db.CategoriesNews.Remove(categoriesNew);
            await db.SaveChangesAsync();

            return Ok(categoriesNew);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoriesNewExists(int id)
        {
            return db.CategoriesNews.Count(e => e.Id == id) > 0;
        }
    }
}