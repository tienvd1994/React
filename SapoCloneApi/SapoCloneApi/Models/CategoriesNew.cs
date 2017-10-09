namespace SapoCloneApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CategoriesNew
    {
        public int Id { get; set; }

        [Required]
        [StringLength(400)]
        public string Name { get; set; }

        public string Description { get; set; }

        [StringLength(400)]
        public string MetaKeywords { get; set; }

        public string MetaDescription { get; set; }

        [StringLength(400)]
        public string MetaTitle { get; set; }

        public int ParentCategoryId { get; set; }

        public bool ShowOnHomePage { get; set; }

        public bool IncludeInTopMenu { get; set; }

        public bool Published { get; set; }

        public int DisplayOrder { get; set; }

        public DateTime CreatedOnUtc { get; set; }

        public DateTime UpdatedOnUtc { get; set; }

        public int? CreatedUserId { get; set; }

        public int? UpdatedUserId { get; set; }

        [StringLength(400)]
        public string UnsignName { get; set; }
    }
}
