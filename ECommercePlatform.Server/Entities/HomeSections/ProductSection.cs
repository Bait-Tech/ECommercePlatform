using ECommercePlatform.Server.Entities.Main;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommercePlatform.Server.Entities.HomeSections
{
    public class ProductSection : BaseSection
    {
        public string BadgeText { get; set; } = string.Empty;
        public string BadgeColor { get; set; } = string.Empty;

        public int? CategoryID { get; set; }

        [ForeignKey("CategoryID")]
        public Category? Category { get; set; }

        public int? SubCategoryID { get; set; }

        [ForeignKey("SubCategoryID")]
        public SubCategory? SubCategory { get; set; }

        public ICollection<SectionProducts> SectionProducts { get; set; } = [];
    }
}