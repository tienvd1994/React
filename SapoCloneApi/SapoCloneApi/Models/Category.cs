namespace SapoCloneApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Category
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Category()
        {
            Products = new HashSet<Product>();
        }

        public int CategoryID { get; set; }

        [Required]
        [StringLength(400)]
        public string CategoryName { get; set; }

        [Column(TypeName = "ntext")]
        public string Description { get; set; }

        [StringLength(400)]
        public string UnsignName { get; set; }

        [Column(TypeName = "image")]
        public byte[] Picture { get; set; }

        public int? ParentId { get; set; }

        public int? Status { get; set; }

        [StringLength(400)]
        public string MetaKeywords { get; set; }

        public string MetaDescription { get; set; }

        [StringLength(400)]
        public string MetaTitle { get; set; }

        public int? ParentCategoryId { get; set; }

        public int? PictureId { get; set; }

        public int? PageSize { get; set; }

        public bool? AllowCustomersToSelectPageSize { get; set; }

        [StringLength(200)]
        public string PageSizeOptions { get; set; }

        [StringLength(400)]
        public string PriceRanges { get; set; }

        public bool? ShowOnHomePage { get; set; }

        public bool? IncludeInTopMenu { get; set; }

        public bool? SubjectToAcl { get; set; }

        public bool? LimitedToStores { get; set; }

        public bool? Published { get; set; }

        public int? DisplayOrder { get; set; }

        public DateTime? CreatedOnUtc { get; set; }

        public DateTime? UpdatedOnUtc { get; set; }

        public int? CreatedUserId { get; set; }

        public int? UpdatedUserId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Product> Products { get; set; }
    }
}
