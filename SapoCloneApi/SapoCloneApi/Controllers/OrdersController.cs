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
using SapoCloneApi.ModelMeta;

namespace SapoCloneApi.Controllers
{
    [Authorize]
    public class OrdersController : ApiController
    {
        private SapoCloneContext db = new SapoCloneContext();

        // GET: api/Orders
        public IQueryable<Order> GetOrders()
        {
            return db.Orders;
        }

        // GET: api/Orders/5
        [ResponseType(typeof(Order))]
        public async Task<IHttpActionResult> GetOrder(int id)
        {
            Order order = await db.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // PUT: api/Orders/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOrder(int id, Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.OrderID)
            {
                return BadRequest();
            }

            db.Entry(order).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/Orders/5
        [ResponseType(typeof(Order))]
        public async Task<IHttpActionResult> DeleteOrder(int id)
        {
            Order order = await db.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            db.Orders.Remove(order);
            await db.SaveChangesAsync();

            return Ok(order);
        }

        // POST: api/Orders
        [ResponseType(typeof(Order))]
        public async Task<IHttpActionResult> PostOrder(OrderMeta orderMeta)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new
                {
                    status = false,
                    data = "Có lỗi xảy ra"
                });
            }

            var order = new Order()
            {
                OrderID = orderMeta.OrderID,
                CustomerID = orderMeta.CustomerID,
                OrderDate = DateTime.Now,
                EmployeeID = 1
            };

            db.Orders.Add(order);

            var rs = 0;

            try
            {
                rs = await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                throw;
            }

            if (rs > 0)
            {
                var listOrderDetail = new List<OrderDetail>();

                foreach (var item in orderMeta.Products)
                {
                    var orderDetail = new OrderDetail()
                    {
                        OrderID = order.OrderID,
                        ProductID = item.ProductID,
                        UnitPrice = item.UnitPrice == null ? 0 : (decimal)item.UnitPrice,
                        Quantity = 1,
                        Discount = 0
                    };

                    listOrderDetail.Add(orderDetail);
                }

                db.OrderDetails.AddRange(listOrderDetail);
                await db.SaveChangesAsync();
            }

            return Ok(new
            {
                status = true,
                data = "Tạo đơn hàng"
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

        private bool OrderExists(int id)
        {
            return db.Orders.Count(e => e.OrderID == id) > 0;
        }
    }
}