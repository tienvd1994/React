using SapoCloneApi.Models;
using System.Collections.Generic;
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
    public class ProductsController : ApiController
    {
        private SapoCloneContext db = new SapoCloneContext();

        public async Task<IHttpActionResult> GetProducts(string keyword, int pageIndex, int pageSize)
        {
            var items = await db.Products.Where(m => (string.IsNullOrEmpty(keyword) || m.ProductName.Contains(keyword))).OrderByDescending(m => m.ProductID).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return Ok(new
            {
                items,
                totalItems = db.Products.Count(m => (string.IsNullOrEmpty(keyword) || m.ProductName.Contains(keyword)))
            });
        }

        // GET: api/Products/5
        [ResponseType(typeof(Product))]
        public async Task<IHttpActionResult> GetProduct(int id)
        {
            Product product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        [Route("api/product/update")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(product).State = EntityState.Modified;

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

        // POST: api/Products
        [HttpPost]
        [ResponseType(typeof(Product))]
        public async Task<IHttpActionResult> PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Products.Add(product);
            await db.SaveChangesAsync();

            return Ok(new
            {
                status = true,
                data = product
            });
        }

        [HttpPost]
        [Route("api/product/delete/{id}")]
        [ResponseType(typeof(Product))]
        public async Task<IHttpActionResult> DeleteProduct(int id)
        {
            Product product = await db.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            var orderDetail = db.OrderDetails.Where(m => m.ProductID == id);

            if (orderDetail != null && orderDetail.Count() > 0)
            {
                db.OrderDetails.RemoveRange(orderDetail);
            }

            db.Products.Remove(product);
            await db.SaveChangesAsync();

            return Ok(new
            {
                status = true,
                data = product
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

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.ProductID == id) > 0;
        }
    }
}