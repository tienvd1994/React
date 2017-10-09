namespace SapoCloneApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Picture")]
    public partial class Picture
    {
        public int Id { get; set; }

        public byte[] PictureBinary { get; set; }

        [Required]
        [StringLength(40)]
        public string MimeType { get; set; }

        [StringLength(300)]
        public string SeoFilename { get; set; }

        public string AltAttribute { get; set; }

        public string TitleAttribute { get; set; }

        public bool IsNew { get; set; }
    }
}
