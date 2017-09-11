using SapoCloneApi.Models;
using System;
using System.Collections.Generic;

namespace SapoCloneApi.ModelMeta
{
    public class OrderMeta
    {
        public int OrderID { get; set; }

        public string CustomerID { get; set; }

        public IEnumerable<Product> Products { get; set; }
    }
}