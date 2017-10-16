using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SapoCloneApi.Models
{
    public class SettingViewModel
    {
        public int Id { get; set; }
        public string Logo { get; set; }
        public string FacebookUrl { get; set; }

        public string SkypeUrl { get; set; }
        public string Title { get; set; }
        public string Keyword { get; set; }
        public string Description { get; set; }
    }
}