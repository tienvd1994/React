namespace SapoCloneApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Customer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Customer()
        {
            Orders = new HashSet<Order>();
        }

        [StringLength(5)]
        public string CustomerID { get; set; }

        [StringLength(1000)]
        public string Username { get; set; }

        [StringLength(1000)]
        public string Email { get; set; }

        public string Password { get; set; }

        public int PasswordFormatId { get; set; }

        public string PasswordSalt { get; set; }

        public int VendorId { get; set; }

        public bool HasShoppingCartItems { get; set; }

        public bool Active { get; set; }

        [StringLength(400)]
        public string SystemName { get; set; }

        public string LastIpAddress { get; set; }

        public DateTime CreatedOnUtc { get; set; }

        public DateTime? LastLoginDateUtc { get; set; }

        public DateTime LastActivityDateUtc { get; set; }

        public bool IsSystemAccount { get; set; }

        public int? CreatedUserId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Order> Orders { get; set; }
    }
}
