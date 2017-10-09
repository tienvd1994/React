using SapoCloneApi.Models;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace SapoCloneApi.Controllers
{
    //[Authorize]
    public class CategoriesController : ApiController
    {
        private SapoCloneContext db = new SapoCloneContext();

        // GET: api/Categories
        public IQueryable<Category> GetCategories()
        {
            return db.Categories.OrderByDescending(m => m.CategoryID);
        }

        public async Task<IHttpActionResult> GetCategories(string keyword, int pageIndex, int pageSize)
        {
            var items = await db.Categories.Where(m => (string.IsNullOrEmpty(keyword) || m.CategoryName.Contains(keyword))).OrderByDescending(m => m.CategoryID).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return Ok(new
            {
                items = items.Select(m => new Category
                {
                    CategoryID = m.CategoryID,
                    CategoryName = m.CategoryName,
                    Description = m.Description,
                    ParentId = m.ParentId,
                    Status = m.Status
                }),
                totalItems = db.Categories.Count(m => (string.IsNullOrEmpty(keyword) || m.CategoryName.Contains(keyword)))
            });
        }

        // GET: api/Categories/5
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> GetCategory(int id)
        {
            Category category = await db.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // PUT: api/Categories/5
        [HttpPost]
        [Route("api/category/update")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCategory(Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(category).State = EntityState.Modified;

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

        // POST: api/Categories
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> PostCategory(Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Categories.Add(category);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = category.CategoryID }, category);
        }

        // DELETE: api/Categories/5
        [HttpPost]
        [ResponseType(typeof(Category))]
        [Route("api/category/delete/{id}")]
        public async Task<IHttpActionResult> DeleteCategory(int id)
        {
            Category category = await db.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            db.Categories.Remove(category);
            await db.SaveChangesAsync();


            return Ok(new
            {
                status = true,
                data = category
            });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryExists(int id)
        {
            return db.Categories.Count(e => e.CategoryID == id) > 0;
        }
    }
}