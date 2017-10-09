namespace SapoCloneApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class News
    {
        public int Id { get; set; }

        public int LanguageId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Short { get; set; }

        [Required]
        public string Full { get; set; }

        public bool Published { get; set; }

        public DateTime? StartDateUtc { get; set; }

        public DateTime? EndDateUtc { get; set; }

        public bool AllowComments { get; set; }

        public int CommentCount { get; set; }

        public bool LimitedToStores { get; set; }

        [StringLength(400)]
        public string MetaKeywords { get; set; }

        public string MetaDescription { get; set; }

        [StringLength(400)]
        public string MetaTitle { get; set; }

        public DateTime CreatedOnUtc { get; set; }

        public DateTime UpdatedOnUtc { get; set; }

        public int? CreatedUserId { get; set; }

        public int? UpdatedUserId { get; set; }

        public string UnsignName { get; set; }
    }
}
