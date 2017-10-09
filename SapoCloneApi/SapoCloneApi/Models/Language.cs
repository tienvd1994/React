namespace SapoCloneApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Language")]
    public partial class Language
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(20)]
        public string LanguageCulture { get; set; }

        [StringLength(2)]
        public string UniqueSeoCode { get; set; }

        [StringLength(50)]
        public string FlagImageFileName { get; set; }

        public bool Rtl { get; set; }

        public bool LimitedToStores { get; set; }

        public int DefaultCurrencyId { get; set; }

        public bool Published { get; set; }

        public int DisplayOrder { get; set; }
    }
}
